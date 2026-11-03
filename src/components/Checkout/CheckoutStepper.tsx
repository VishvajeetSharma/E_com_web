import { FaCheck } from "react-icons/fa";

const STEPS = ["Bag", "Delivery & review", "Payment"];

/** Presentational step indicator. `current` is 0-based. */
const CheckoutStepper = ({ current }: { current: number }) => (
  <nav className="ck-stepper" aria-label="Checkout progress">
    <ol>
      {STEPS.map((label, i) => {
        const state = i < current ? "done" : i === current ? "current" : "todo";
        return (
          <li key={label} className={`ck-step is-${state}`} aria-current={state === "current" ? "step" : undefined}>
            <span className="ck-step-dot" aria-hidden="true">{state === "done" ? <FaCheck size={9} /> : i + 1}</span>
            <span className="ck-step-label">{label}</span>
          </li>
        );
      })}
    </ol>
  </nav>
);

export default CheckoutStepper;
