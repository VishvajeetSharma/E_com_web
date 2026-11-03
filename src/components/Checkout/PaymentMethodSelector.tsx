import { useState, type ChangeEvent, type ComponentType } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

export interface PayOption {
  id: string;
  title: string;
  hint?: string;
  icon: ComponentType<{ size?: number | string }>;
}

export interface CardDetails { cardNumber: string; expiry: string; cvv: string }

interface Props {
  options: PayOption[];
  value: string;
  onChange: (id: string) => void;
  card: CardDetails;
  onCardChange: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

/**
 * Method picker. Card fields are local-state only (as before): nothing here validates, sends or stores them.
 * Number and CVV are masked by default.
 */
const PaymentMethodSelector = ({ options, value, onChange, card, onCardChange, disabled }: Props) => {
  const [reveal, setReveal] = useState(false);
  return (
    <div className="ck-methods" role="radiogroup" aria-label="Payment method">
      {options.map((o) => {
        const on = value === o.id;
        return (
          <div key={o.id} className={`ck-method${on ? " is-on" : ""}`}>
            <button
              type="button"
              role="radio"
              aria-checked={on}
              disabled={disabled}
              className="ck-method-head"
              onClick={() => onChange(o.id)}
            >
              <span className="ck-method-ico"><o.icon size={18} /></span>
              <span className="ck-method-txt">
                <b>{o.title}</b>
                {o.hint && <small>{o.hint}</small>}
              </span>
              <span className="ck-radio" aria-hidden="true">{on && <FaCheckCircle size={14} />}</span>
            </button>
            <AnimatePresence initial={false}>
              {on && o.id === "card" && (
                <motion.div
                  className="ck-card-form"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="ck-card-inner">
                    <label>
                      <span>Card number</span>
                      <span className="ck-inline">
                        <input
                          name="cardNumber"
                          type={reveal ? "text" : "password"}
                          inputMode="numeric"
                          autoComplete="off"
                          placeholder="•••• •••• •••• ••••"
                          value={card.cardNumber}
                          onChange={onCardChange}
                        />
                        <button type="button" onClick={() => setReveal((v) => !v)} aria-pressed={reveal}>{reveal ? "Hide" : "Show"}</button>
                      </span>
                    </label>
                    <div className="ck-row2">
                      <label>
                        <span>Expiry</span>
                        <input name="expiry" inputMode="numeric" autoComplete="off" placeholder="MM/YY" value={card.expiry} onChange={onCardChange} />
                      </label>
                      <label>
                        <span>CVV</span>
                        <input name="cvv" type="password" inputMode="numeric" autoComplete="off" placeholder="•••" value={card.cvv} onChange={onCardChange} />
                      </label>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default PaymentMethodSelector;
