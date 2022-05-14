const LastNews = () => {

  const HeaderComponent = () => {
    return (
      <div className={"title-component"}>
        <span>Last News</span>
      </div>
    )
  }

  return (
    <div>
      <HeaderComponent />
      <div>
        content
      </div>
    </div>
  )
}

export default LastNews;