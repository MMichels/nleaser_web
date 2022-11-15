import React from 'react'
import { OverlayTrigger, Tooltip as BoostrapTooltip } from 'react-bootstrap';


interface ITooltipProps {
  placement: "top"|"right"|"bottom"|"left";
  tooltip: string;
  children: React.ReactElement

}

export const Tooltip = React.memo(({placement, tooltip, children}:ITooltipProps) => {
  return (
    <OverlayTrigger
      trigger="click"
      rootClose={true}
      placement={placement}
      overlay={
        <BoostrapTooltip>
          {tooltip}            
        </BoostrapTooltip>
      }      
    >
      {children}
    </OverlayTrigger>
  )
})
