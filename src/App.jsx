
import './App.css'


// tells the app to render
function App() {

  return (
    <div className='w-screen h-screen flex justify-center bg-slate-900'>
     <ScreenContainer/>
    </div>
  )
}

export default App


//defines the different entities
const entities = {
 Warrior (en){

  const [position] = useSpring(() => ({
     from: en.position,
     to: game.location("enemy goal").position,
     config:{mass:800}
   }),   []  )

  return      <animated.div className="w-8 h-8 flex absolute bg-purple-800" style={{...position}}>{ en.id }</animated.div>
 },

 Archer (en){
  const position = en.position
  return      <div className="w-8 h-8 flex absolute bg-blue-800" style={{...position}}>{ en.id }</div>
 },
 Turret (en){
  const position = en.position
  return      <div className="w-8 h-8 flex absolute bg-red-800" style={{...position}}>{ en.id }</div>
 },
}



// portions and defines the game field
function ScreenContainer(){
 let aspectRatio = 1/1.5,  width = 600 //set these arbitrarily

 const [container, bounds] = useMeasure() //find view port width
 const scale = (bounds.width-0)/width

 return (
 <div className={`h-full relative overflow-hidden`} style = {{aspectRatio}} ref={container}>
  <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2' id="position field in center of container">
   <div style={{transform:`scale(${scale})`, width, aspectRatio}} className={"relative bg-slate-800"} id="field">

    {/* show all entities */}
    {game.Entities.map(en=>entities[en.type](en))}
    
   </div>
  </div>
 </div>
 )
}


// holds the game state
const game = sweet({ 
 entities:[
  {id:4, type:"Warrior", position:{left:50, bottom:600}},
  {id:3, type:"Archer", position:{left:400, bottom:500}},
  {id:2, type:"Turret", position:{left:500, bottom:500}},
 ],
 locations:[
  {id:"enemy goal", position:{left:300, bottom:800}},
  {id:"my goal", position:{left:300, bottom:100}}
 ],
})
.selectors({
 entity:id=>s=>s.entities.find(e=>e.id==id),
 location:id=>s=>s.locations.find(e=>e.id==id),
})