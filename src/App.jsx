
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
const centerOnPosition = {transform:"translate(-50%,-50%)"} // reused style
const entities = {
 Example (en){

  // example of movement in a line
  const [position] = useSpring(() => ({
     from: en.position,
     to: game.location("enemy goal").position,
     //https://www.react-spring.dev/docs/advanced/config
     config:{mass:800, clamp:true}
   }),   []  )

  return      <animated.div className="w-8 h-8 flex absolute bg-purple-800" style={{...position, ...centerOnPosition}}>{ en.id }</animated.div>
 },

 Archer (en){
  const position = en.position
  return      <div className="w-8 h-8 flex absolute bg-blue-800" style={{...position, ...centerOnPosition}}>{ en.id }</div>
 },
 Turret (en){
  const position = en.position
  return      <div className="w-8 h-8 flex absolute bg-red-800" style={{...position, ...centerOnPosition}}>{ en.id }</div>
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

    {/* show all entities */
     game.Entities.map(function Entity (en){
      const Form = entities[en.type]
      return <Form key={en.id+" -  entity"} {...en}/>}
     )
    }
    
   </div>
  </div>
 </div>
 )
}


// holds the game state
const select = {
 entity:id=>s=>s.entities.find(e=>e.id==id),
 location:id=>s=>s.locations.find(e=>e.id==id),
}
const method = {
 damageEntity:(id, dmg)=>s=>{
  let unit = select.entity(id)(s)
  unit.health -=dmg
  if(unit.health<=0)method.removeEntity(id)(s)
 },
 removeEntity:id=>s=>{s.entities = s.entities.filter(e=>e.id!=id)}
}
const game = sweet({ 
 entities:[
  {id:4, type:"Example", health:50, position:{left:50, bottom:50}},
  {id:3, type:"Archer", position:{left:400, bottom:500}},
  {id:2, type:"Turret", position:{left:500, bottom:500}},
 ],
 locations:[
  {id:"enemy goal", position:{left:300, bottom:800}},
  {id:"my goal", position:{left:300, bottom:100}}
 ],
 select,
 method,
})



// For units
// A health stat
// an event that removes them when their health stat reaches 