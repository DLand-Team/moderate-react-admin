import { Card } from 'antd'
import { Area } from '@ant-design/plots'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
const { Meta } = Card


export interface ICardTemplateProps {
  data: any
  title: string
  description?: string
}

export const CardTemplate = (info: ICardTemplateProps) => {
  const { data, title, description } = info

  let chartData = []

  if (data.length > 0) { 

    switch (title) {
      case "Visits":
        for (let item of data) { 
          chartData.push({
              date:  dayjs(item.created_at).format('YYYY-MM-DD'),
            number: item.visits
          })
        }
        break;
        
        case "Users":
          for (let item of data) { 
            chartData.push({
              date:  dayjs(item.created_at).format('YYYY-MM-DD'),
              number: item.user_count
            })
          }
          break;
          
          
          case "Partners":
            for (let item of data) { 
              chartData.push({
          date:  dayjs(item.created_at).format('YYYY-MM-DD'),
          number: item.partner_count
        })
      }
      break;
      
      case "Opportunities":
        for (let item of data) { 
          chartData.push({
            date:  dayjs(item.created_at).format('YYYY-MM-DD'),
            number: item.opportunity_count
          })
        }
        break;
        
      case "Enquiries":
        for (let item of data) { 
          chartData.push({
            date:  dayjs(item.created_at).format('YYYY-MM-DD'),
            number: item.enquiry_count
          })
        }
        break;
      
        default:
          break;
        }
      }
        
        return (
          <Card
          hoverable
          loading={data.length === 0}
          style={{ flexGrow:1 }}
      >
      <Meta title={title} description={description} />
      {/* {info.title}: { data.length === 0 ? 'loading' : data[0].value } */}
      {chartData.length > 0  ?  <CardAreaChart data={chartData} /> : "loading" }  
    </Card>
  )

}

const CardAreaChart = ({ data }) => { 

  const config = {
    data,
    xField: 'date',
    yField: 'number',
    height: 400,
  }

  return <Area {...config}/>
}



