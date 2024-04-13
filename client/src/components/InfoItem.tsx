import { createMoviesInfoList, createRenderedValue } from '../utils/helper';

type ArrayData = ReturnType<typeof createMoviesInfoList>;
type Data = ArrayData[0];
interface InfoItemProps {
  data: Data;
}

function InfoItem({ data }: InfoItemProps) {
  const renderedValue = createRenderedValue(data);

  return (
    <div className="mb-4 flex flex-col gap-1">
      <h4 className="text-base font-bold">{data.key}</h4>
      <span className="text-xs dark:text-slate-400">{renderedValue}</span>
    </div>
  );
}

export default InfoItem;
