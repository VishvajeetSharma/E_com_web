import { useId, type ReactElement, cloneElement } from "react";

interface Props {
  text: string;
  children: ReactElement<{ "aria-describedby"?: string }>;
}

/** CSS-only tooltip; shown on hover and keyboard focus, wired up with aria-describedby. */
const Tooltip = ({ text, children }: Props) => {
  const id = useId();
  return (
    <span className="ui-tip">
      {cloneElement(children, { "aria-describedby": id })}
      <span role="tooltip" id={id} className="ui-tip__bubble">{text}</span>
    </span>
  );
};

export default Tooltip;
