import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface BarChartProps {
  data: Record<string, any>[];
  dynamicKey: string;
  title: string;
}

const CustomBarChart = ({ data, dynamicKey, title }: BarChartProps) => {
  const maxElement = data.reduce(
    (max, obj) => (obj.count > max ? obj.count : max),
    0
  );
  return (
    <>
      <h2 className="text-center font-semibold text-grey_dark_2 text-lg uppercase">
        {title}
      </h2>
      {data.length > 0 ? (
        <div className="w-full h-[300px] mb-6 border-b">
          <ResponsiveContainer>
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }} 
            >
              <XAxis
                domain={[0, maxElement + 5]}
                allowDecimals={false}
                type="number"
              />
              <YAxis type="category" dataKey={dynamicKey} />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#eb2f64" barSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <h2 className="my-6 border-b pb-3 text-center text-lg font-semibold text-primary_red ">
          No Users Found
        </h2>
      )}
    </>
  );
};

export default CustomBarChart;
