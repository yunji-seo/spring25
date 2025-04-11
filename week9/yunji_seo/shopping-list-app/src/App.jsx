import { useState } from 'react';
import './App.css'
import ShoppingList from './ShoppingList';


function App() {
   const [shoppingList, setShoppingList] = useState([]);
   const [budget] = useState(100);


   const addItem = (event) => {
       event.preventDefault();
       let form = event.target;
       let formData = new FormData(form)
       let formDataObj = Object.fromEntries(formData.entries())
       formDataObj.cost = parseFloat(formDataObj.cost || 0);


       setShoppingList([...shoppingList, formDataObj])
       form.reset();
   }


   const removeItem = (event) => {
       const name = event.target.value;
       setShoppingList(shoppingList.filter(item => item.name !== name));
   };

   const getRemainingBudget = () => {
    return (budget - shoppingList.reduce((acc, item) => acc + item.cost, 0)).toFixed(2);
   };



   return (
       <>
           <h1>Shopping List Manager</h1>
           <h2>Remaining Budget: ${getRemainingBudget()}</h2>

           <div className='card'>
               <form onSubmit={addItem} className='flex-apart'>
                   <input type="text" name="name" placeholder='Add item to list...' />
                   <input type="number" name="cost" placeholder='Cost' step="0.01" min="0" required />
                   <button className='btn purple' type='submit'>Add</button>
               </form>
           </div>


           <ShoppingList
               shoppingList={shoppingList}
               removeItem={removeItem}
               budget={budget}
           />
       </>
   );
}


export default App;
