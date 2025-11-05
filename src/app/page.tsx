'use client';
import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('HomePage');
  return (
    <div className="p-4 flex flex-col gap-4">
      <span className=" flex gap-1" dir="rtl">
        <input
          type="text"
          placeholder="أدخل اسمك..."
          style={{
            backgroundColor: '#C0C0C0',
            border: '2px inset #C0C0C0',
            fontSize: '11px',
            padding: '2px 4px',
            color: '#000000',
            textAlign: 'right',
          }}
        />
        <button
          style={{
            backgroundColor: '#C0C0C0',
            border: '2px outset #C0C0C0',
            fontSize: '11px',
            padding: '2px 8px',
            color: '#000000',
            cursor: 'pointer',
          }}
          onMouseDown={(e) =>
            (e.currentTarget.style.border = '2px inset #C0C0C0')
          }
          onMouseUp={(e) =>
            (e.currentTarget.style.border = '2px outset #C0C0C0')
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.border = '2px outset #C0C0C0')
          }
        >
          موافق
        </button>
      </span>

      <span className=" flex gap-1" dir="rtl">
        <button
          style={{
            backgroundColor: '#C0C0C0',
            border: '2px outset #C0C0C0',
            fontSize: '11px',
            padding: '2px 8px',
            color: '#000000',
            cursor: 'pointer',
          }}
          onMouseDown={(e) =>
            (e.currentTarget.style.border = '2px inset #C0C0C0')
          }
          onMouseUp={(e) =>
            (e.currentTarget.style.border = '2px outset #C0C0C0')
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.border = '2px outset #C0C0C0')
          }
        >
          موافق
        </button>
      </span>

      {/* 90s Style Checkbox */}
      <div className="flex items-center gap-2" dir="rtl">
        <label
          style={{
            fontSize: '11px',
            color: '#000000',
            cursor: 'pointer',
          }}
        >
          أوافق على الشروط والأحكام
        </label>
        <input
          type="checkbox"
          style={{
            width: '13px',
            height: '13px',
            backgroundColor: '#FFFFFF',
            border: '2px inset #C0C0C0',
            cursor: 'pointer',
          }}
        />
      </div>

      {/* 90s Style Card */}
      <div
        style={{
          backgroundColor: '#C0C0C0',
          border: '2px outset #C0C0C0',
          padding: '8px',
          width: '250px',
        }}
      >
        <div
          style={{
            backgroundColor: '#000080',
            color: '#FFFFFF',
            fontSize: '11px',
            fontWeight: 'bold',
            padding: '2px 4px',
            marginBottom: '4px',
          }}
        >
          معلومات المستخدم
        </div>
        <div style={{ fontSize: '11px', color: '#000000', lineHeight: '1.3' }}>
          <div>الاسم: أحمد محمد</div>
          <div>البريد الإلكتروني: ahmed@example.com</div>
          <div>تاريخ التسجيل: 05/11/2025</div>
        </div>
        <div style={{ marginTop: '6px', textAlign: 'center' }}>
          <button
            style={{
              backgroundColor: '#C0C0C0',
              border: '2px outset #C0C0C0',
              fontSize: '11px',
              padding: '2px 12px',
              color: '#000000',
              cursor: 'pointer',
            }}
            onMouseDown={(e) =>
              (e.currentTarget.style.border = '2px inset #C0C0C0')
            }
            onMouseUp={(e) =>
              (e.currentTarget.style.border = '2px outset #C0C0C0')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.border = '2px outset #C0C0C0')
            }
          >
            تعديل
          </button>
        </div>
      </div>
    </div>
  );
}
