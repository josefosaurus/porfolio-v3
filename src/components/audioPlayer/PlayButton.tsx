import React from "react"

export const PlayButton = ({
  playAction,
  state,
}: {
  playAction: any
  state: boolean
}) => {
  return (
    <figure
      onClick={playAction}
      className={` button-wrapper ${state ? "active" : ""}`}
    >
      <div className="left"></div>
      <div className="right"></div>
    </figure>
  )
}
