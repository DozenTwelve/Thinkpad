// products-from-notion.js
import { NotionAPI } from 'notion-client'

const api = new NotionAPI()

export async function fetchNotionProducts() {
  const recordMap = await api.getPage('1bf7acfb0ac780d2a049f02458049576')
  const blocks = Object.values(recordMap.block)

  const products = blocks
    .filter(block => block.value?.type === 'page')
    .map(block => {
      const props = block.value.properties || {}
      return {
        id: getText(props.id),
        name: getText(props.title),
        cpu: getText(props['CPU']),
        ram: getText(props.ram),
        storage: getText(props.storage),
        display: getText(props.display),
        price: getText(props.price),
        image: '', // 暂时保留，Notion 图像解析可后续补充
      }
    })

  return products
}

function getText(prop) {
  return prop?.[0]?.[0] || ''
}