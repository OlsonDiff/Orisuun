import { content } from '../data/contentData';
import ToolsCard from './toolsCard';

const ToolsComponent = () => {
  return (
    <div className="flex flex-col w-full lg:gap-0 md:gap-20 sm:gap-20 small-500:gap-20">
      {content.map((item, index) => (
        <ToolsCard
          key={index}
          header={item.header}
          paragraphs={item.paragraphs}
          imageSrc={item.imageSrc}
          imageLeft={item.imageLeft}
          contentHeight={item.contentHeight}
          titleLength={item.titleLength}
          titleHeight={item.titleHeight}
          cardHeight={item.cardHeight}
        />
      ))}
    </div>
  );
};

export default ToolsComponent;
