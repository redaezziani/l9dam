import { getProducts } from '@/src/(actions)/products';
import { localizedPath } from '@/src/lib/seo-utils';
import type { Product, Variant } from '@/src/store/prodcuts-store';

const PAGE_SIZE = 100;

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function cdata(value: string): string {
  return `<![CDATA[${value}]]>`;
}

// Fallback used only if the live Strapi shipping rules can't be fetched.
const FALLBACK_SHIPPING_PRICE_AED = 12;

interface ShippingPriceRule {
  minPieces: number;
  maxPieces: number | null;
  price: number;
  currency: string;
}

interface ShippingRule {
  priceRules: ShippingPriceRule[];
}

async function getSingleItemShippingPrice(): Promise<number> {
  try {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/shippings`;
    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_KEY}`,
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) return FALLBACK_SHIPPING_PRICE_AED;

    const data = await res.json();
    const rules: ShippingRule[] = data.data || [];

    // Use the lowest single-item (1 piece) rate across all configured rules.
    const singleItemPrices = rules
      .flatMap((rule) => rule.priceRules || [])
      .filter((rule) => rule.minPieces <= 1 && (rule.maxPieces === null || rule.maxPieces >= 1))
      .map((rule) => rule.price);

    if (singleItemPrices.length === 0) return FALLBACK_SHIPPING_PRICE_AED;

    return Math.min(...singleItemPrices);
  } catch {
    return FALLBACK_SHIPPING_PRICE_AED;
  }
}

async function getAllProducts(locale: string): Promise<Product[]> {
  const all: Product[] = [];
  let page = 1;
  while (true) {
    const { products, pagination } = await getProducts({
      locale,
      page,
      pageSize: PAGE_SIZE,
    });
    all.push(...products);
    if (!pagination || page >= pagination.pageCount) break;
    page += 1;
  }
  return all;
}

function buildItem(
  product: Product,
  variant: Variant,
  locale: string,
  baseUrl: string,
  shippingPriceAed: number,
): string {
  const productUrl = `${baseUrl}${localizedPath(`/store/${product.documentId}`, locale)}`;
  const image = product.coverImage?.url || product.images?.[0]?.url || '';
  const additionalImages = (product.images || [])
    .filter((img) => img.url !== image)
    .slice(0, 10);

  const availability = variant.stock > 0 ? 'in stock' : 'out of stock';
  const itemId = `${product.documentId}-${variant.documentId}`;

  return `
  <item>
    <g:id>${escapeXml(itemId)}</g:id>
    <g:item_group_id>${escapeXml(product.documentId)}</g:item_group_id>
    <title>${cdata(product.name)}</title>
    <description>${cdata(product.description || product.name)}</description>
    <link>${escapeXml(productUrl)}</link>
    ${image ? `<g:image_link>${escapeXml(image)}</g:image_link>` : ''}
    ${additionalImages.map((img) => `<g:additional_image_link>${escapeXml(img.url)}</g:additional_image_link>`).join('\n    ')}
    <g:condition>new</g:condition>
    <g:availability>${availability}</g:availability>
    <g:price>${variant.price.toFixed(2)} AED</g:price>
    <g:brand>Lqdam</g:brand>
    <g:identifier_exists>no</g:identifier_exists>
    <g:mpn>${escapeXml(variant.sku)}</g:mpn>
    <g:product_type>Shoes &gt; Kung Fu Shoes</g:product_type>
    <g:google_product_category>187</g:google_product_category>
    ${variant.color ? `<g:color>${escapeXml(variant.color.label)}</g:color>` : ''}
    ${variant.size ? `<g:size>${escapeXml(variant.size.label)}</g:size>` : ''}
    <g:shipping>
      <g:country>AE</g:country>
      <g:service>Standard</g:service>
      <g:price>${shippingPriceAed.toFixed(2)} AED</g:price>
    </g:shipping>
  </item>`;
}

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lqdam.com';
  const locale = 'en';

  const [products, shippingPriceAed] = await Promise.all([
    getAllProducts(locale),
    getSingleItemShippingPrice(),
  ]);

  const items = products
    .flatMap((product) =>
      product.variants.length > 0
        ? product.variants.map((variant) =>
            buildItem(product, variant, locale, baseUrl, shippingPriceAed),
          )
        : [],
    )
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
<channel>
  <title>${cdata('Lqdam Product Feed')}</title>
  <link>${escapeXml(baseUrl)}</link>
  <description>${cdata('Lqdam authentic kung fu shoes — product feed for Google Merchant Center')}</description>${items}
</channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
