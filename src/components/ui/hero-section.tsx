import ReactMarkdown from 'react-markdown';

interface HeroSectionProps {
  content: string;
}

const HeroSection = ({ content }: HeroSectionProps) => {
  return (
    <section className="w-full text-center sm:max-w-5xl  pb-4 flex flex-col gap-6 px-4">
      <div className="flex w-full justify-center items-center ">
        <img src={'/images/app-logo-black.png'} alt="logo" className="w-32" />
      </div>

      <div className="prose prose-sm max-w-none text-[#4a403a] pt-4 prose-img:rounded-none">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </section>
  );
};

export default HeroSection;
