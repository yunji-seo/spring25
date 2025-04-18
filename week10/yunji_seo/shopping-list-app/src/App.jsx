import { useState } from 'react';
import './App.css'
import ShoppingList from './ShoppingList';
import CategoryFilter from './CategoryFilter';
import DueDate from './DueDate';


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

    // 상태 추가
    const [filterCategory, setFilterCategory] = useState('all');

    // 필터링된 리스트 만들기
    const filteredList = shoppingList.filter(item =>
        filterCategory === 'all' ? true : item.category === filterCategory
    );


   return (
       <>
           <h1>Shopping List Manager</h1>
           <h2>Remaining Budget: ${getRemainingBudget()}</h2>

           <div className='card'>
               <form onSubmit={addItem} className='flex-apart'>
                   <input type="text" name="name" placeholder='Add item to list...' />
                   <input type="number" name="cost" placeholder='Cost' step="0.01" min="0" required />

                   <select name="category" defaultValue="grocery" required>
                    <option value="grocery">Grocery</option>
                    <option value="school">School</option>
                    <option value="other">Other</option>
                   </select>

                   <DueDate />

                   <button className='btn purple' type='submit'>Add</button>
               </form>
           </div>


           <ShoppingList
               shoppingList={shoppingList}
               removeItem={removeItem}
               budget={budget}
           />
           
           <CategoryFilter currentCategory={filterCategory} setCategory={setFilterCategory} />
           
           <ShoppingList
                shoppingList={filteredList}
                removeItem={removeItem}
                budget={budget}/>

       </>
   );
}


export default App;
