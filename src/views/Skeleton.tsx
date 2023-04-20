import { Skeleton } from "antd-mobile"

export default () => {
  return (
    <>
      <Skeleton.Title animated />
      <Skeleton.Paragraph lineCount={10} animated />
    </>
  )
}