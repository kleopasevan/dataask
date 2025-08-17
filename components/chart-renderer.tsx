"use client"

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

interface ChartRendererProps {
  data: any[]
  type: "bar" | "line" | "area" | "scatter" | "table"
  title?: string
}

export function ChartRenderer({ data, type, title }: ChartRendererProps) {
  if (!data || data.length === 0) {
    return <div className="flex items-center justify-center h-64 text-muted-foreground">No data to display</div>
  }

  if (type === "table") {
    const columns = Object.keys(data[0])
    return (
      <div className="space-y-4">
        {title && <h3 className="text-lg font-semibold">{title}</h3>}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-border">
            <thead>
              <tr className="bg-muted">
                {columns.map((column) => (
                  <th key={column} className="border border-border p-2 text-left font-medium">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index} className="hover:bg-muted/50">
                  {columns.map((column) => (
                    <td key={column} className="border border-border p-2">
                      {row[column]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  const renderChart = () => {
    const commonProps = {
      data,
      margin: { top: 5, right: 30, left: 20, bottom: 5 },
    }

    switch (type) {
      case "bar":
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={Object.keys(data[0])[0]} />
            <YAxis />
            <Tooltip />
            <Legend />
            {Object.keys(data[0])
              .slice(1)
              .map((key, index) => (
                <Bar key={key} dataKey={key} fill={`hsl(${index * 60}, 70%, 50%)`} />
              ))}
          </BarChart>
        )

      case "line":
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={Object.keys(data[0])[0]} />
            <YAxis />
            <Tooltip />
            <Legend />
            {Object.keys(data[0])
              .slice(1)
              .map((key, index) => (
                <Line key={key} type="monotone" dataKey={key} stroke={`hsl(${index * 60}, 70%, 50%)`} />
              ))}
          </LineChart>
        )

      case "area":
        return (
          <AreaChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={Object.keys(data[0])[0]} />
            <YAxis />
            <Tooltip />
            <Legend />
            {Object.keys(data[0])
              .slice(1)
              .map((key, index) => (
                <Area key={key} type="monotone" dataKey={key} fill={`hsl(${index * 60}, 70%, 50%)`} />
              ))}
          </AreaChart>
        )

      case "scatter":
        return (
          <ScatterChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={Object.keys(data[0])[0]} />
            <YAxis dataKey={Object.keys(data[0])[1]} />
            <Tooltip />
            <Scatter data={data} fill="hsl(220, 70%, 50%)" />
          </ScatterChart>
        )

      default:
        return <div>Unsupported chart type</div>
    }
  }

  return (
    <div className="space-y-4">
      {title && <h3 className="text-lg font-semibold">{title}</h3>}
      <ResponsiveContainer width="100%" height={300}>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  )
}


