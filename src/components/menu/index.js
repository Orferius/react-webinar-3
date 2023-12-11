import { memo } from "react";
import BasketTool from "../basket-tool";
import Navigation from "../navigation";
import "./style.css";

const Menu = ({onOpen, amount, sum}) => {
  return (
    <div className="Menu">
      <Navigation />
      <BasketTool onOpen={onOpen} amount={amount} sum={sum}/>
    </div>
  );
};

export default memo(Menu);