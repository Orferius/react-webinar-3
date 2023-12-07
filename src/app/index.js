import {useCallback, useContext, useEffect, useState} from 'react';
import { Routes, Route } from "react-router-dom";
import Main from "./main";
import Basket from "./basket";
import Product from "./product";
import useStore from "../store/use-store";
import useSelector from "../store/use-selector";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='/:id' element={<Product/>}/>
      </Routes>
      {activeModal === 'basket' && (
        <Routes>
          <Route path='/*' element={<Basket/>}/>
      </Routes>)}
    </>
  );
}

export default App;
