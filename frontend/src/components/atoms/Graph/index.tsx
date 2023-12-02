import React, { useEffect, useState } from 'react'
import { ResponsiveLine } from '@nivo/line'

export interface GraphArrayProps {
  id: string | number
  color: string
  data: Array<{
    x: number | string | Date
    y: number | string | Date
  }>
}
export interface GraphProps {
  data: Array<GraphArrayProps>
  showYGridLines: boolean
  showXAxis: boolean
  gridYValues?: Array<string | number>
  showLegends: boolean
  margins: { top: number; right: number; bottom: number; left: number }
  legendProps?: {
    translateX: number
    translateY: number
    itemHeight: number
    itemWidth: number
    itemSpacing: number
    symbolSize: number
    itemTextColor: string
  }
}

//While using this component, always wrap it inside a parent container(Box,div,etc) having some height, otherwise it would not render

const Graph = (props: GraphProps) => {
  const { data, showYGridLines, legendProps, showLegends, margins, showXAxis } =
    props
  const [graphData, setGraphData] = useState(Array<GraphArrayProps>)

  useEffect(() => {
    setGraphData(data)
  }, [data])

  return (
    <>
      <ResponsiveLine
        data={graphData}
        axisLeft={{ tickValues: 0 }} //We don't have Y axis values visible in any graph inside the figma,so we won't need it
        margin={margins}
        yScale={{
          type: 'linear',
          min: 0,
          max: 'auto',
          stacked: false,
          reverse: false,
        }}
        colors={{ datum: 'color' }}
        enablePoints={false}
        curve="natural"
        xScale={{
          type: 'time',
          format: '%Y-%m-%d',
          precision: 'day',
          useUTC: false,
        }}
        xFormat="time:%Y-%m-%d"
        axisBottom={
          showXAxis
            ? {
                tickValues: 5,
                format: '%b %d',
                tickPadding: 10,
              }
            : { tickValues: 0, format: '', tickPadding: 10 } //Hide the X axis as per showXAxis
        }
        enableArea={true}
        enableGridX={false}
        enableGridY={showYGridLines}
        legends={
          showLegends
            ? [
                {
                  anchor: 'top-right',
                  direction: 'row',
                  justify: false,
                  translateX: legendProps?.translateX,
                  translateY: legendProps?.translateY,
                  itemWidth: legendProps?.itemWidth ?? 0,
                  itemHeight: legendProps?.itemHeight ?? 0,
                  itemsSpacing: legendProps?.itemSpacing,
                  symbolSize: legendProps?.symbolSize,
                  symbolShape: 'circle',
                  itemDirection: 'left-to-right',
                  itemTextColor: legendProps?.itemTextColor,
                },
              ]
            : undefined
        }
        useMesh={true}
      />
    </>
  )
}
export default Graph
