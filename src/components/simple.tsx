import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  TooltipProps,
} from "recharts"
import { useState, useContext } from "react"
import { useFinance } from "../context/finance-context"
import { Button } from "@heroui/react"
import { ThemeContext } from "../components/theme-provider"

const BarChartWithFilter: React.FC = () => {
  const [days, setDays] = useState<7 | 14 | 30 | 60>(7)
  const { getDailyData } = useFinance()
  const { theme } = useContext(ThemeContext)
  const filteredData = getDailyData(days)
  const isDark = theme === "dark"

  // Цвета для темной и светлой темы
  const colors = {
    background: isDark ? "#1f2937" : "#ffffff",
    text: isDark ? "#e5e7eb" : "#374151",
    grid: isDark ? "#374151" : "#e5e7eb",
    income: isDark ? "#10b981" : "#34d399",
    expense: isDark ? "#ef4444" : "#f87171",
  }

  const formatXAxisTick = (value: string) => value.split(" ")[0]

  const getInterval = () => {
    switch (days) {
      case 7:
        return 0
      case 14:
        return 1
      case 30:
        return 3
      case 60:
        return 4
      default:
        return 0
    }
  }

  type TooltipEntry = {
    name: "income" | "expense"
    value?: number
    color: string
    payload: Record<string, unknown>
  }

  type CustomTooltipProps = TooltipProps<number, string> & {
    payload?: TooltipEntry[]
  }

  const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (!active || !payload || payload.length === 0) return null

    const filteredPayload = payload.filter(
      entry => entry.value !== undefined && entry.value !== 0,
    )

    if (filteredPayload.length === 0) {
      return (
        <div
          className={`p-3 rounded-lg shadow-xl border ${
            isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          }`}
        >
          <p className="font-medium mb-2">{label}</p>
          <p className="text-sm">Нет данных</p>
        </div>
      )
    }

    return (
      <div
        className={`p-3 rounded-lg shadow-xl border ${
          isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        <p className="font-medium mb-2">{label}</p>
        <div className="space-y-1">
          {filteredPayload.map(entry => (
            <div key={entry.dataKey} className="flex items-center">
              <div
                className="w-2 h-2 rounded-full mr-2"
                style={{ background: entry.color }}
              />
              <span className="text-sm">
                {entry.dataKey === "income" ? "Доход" : "Расход"}:{" "}
                <strong>{entry.value?.toLocaleString("ru-RU")} ₽</strong>
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      {[7, 14, 30, 60].map(d => (
        <Button
          key={`days${d}`}
          onPress={() => setDays(d as 7 | 14 | 30 | 60)}
          className="mr-1"
        >
          {d} дней
        </Button>
      ))}
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={filteredData}
          margin={{ top: 20, right: 10, left: 10, bottom: 5 }}
          barCategoryGap={10}
        >
          <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={colors.income} stopOpacity={0.8} />
              <stop offset="100%" stopColor={colors.income} stopOpacity={1} />
            </linearGradient>
            <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={colors.expense} stopOpacity={0.8} />
              <stop offset="100%" stopColor={colors.expense} stopOpacity={1} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="name"
            tickFormatter={formatXAxisTick}
            interval={getInterval()}
            tick={{ fill: colors.text, fontSize: 12 }}
            axisLine={{ stroke: colors.grid, strokeWidth: 1.5 }}
            tickLine={{ stroke: colors.grid, strokeWidth: 1.5 }}
          />
          <YAxis
            tick={{ fill: colors.text, fontSize: 12 }}
            axisLine={{ stroke: colors.grid, strokeWidth: 1.5 }}
            tickLine={{ stroke: colors.grid, strokeWidth: 1.5 }}
            width={80}
            tickFormatter={value => value.toLocaleString()}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{
              fill: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
            }}
          />
          <Legend
            wrapperStyle={{ paddingTop: 20, color: colors.text }}
            formatter={value => <span className="text-sm">{value}</span>}
          />
          <Bar
            dataKey="income"
            name="Доход"
            fill="url(#incomeGradient)"
            radius={[4, 4, 0, 0]}
            animationDuration={1300}
            animationEasing="ease-out"
          />
          <Bar
            dataKey="expense"
            name="Расход"
            fill="url(#expenseGradient)"
            radius={[4, 4, 0, 0]}
            animationDuration={1300}
            animationEasing="ease-out"
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  )
}

export default BarChartWithFilter
