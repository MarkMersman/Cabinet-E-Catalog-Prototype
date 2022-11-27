const Door = require('../models/Door');
const DoorStyle = require('../models/DoorStyle');
const Drawer = require('../models/drawer');
const Frame = require('../models/Frame');
const Material = require('../models/material');
const doorController = require('./door');


let frame = new Frame();
let door = new Door();
let style = new DoorStyle();
let drawer = new Drawer();
let wood = new Material();
let totalMaterialsCost = 0.00;
let materialList = new Object();


function createMaterialList(){
    return {
    wood: {
        quantity : 0,
        price : 0,
        totCost : 0,
    },
    screws:{
        quantity : 0,
        price : 0,
        totCost : 0
    },
    hinges: {
        quantity : 0,
        price : 0,
        totCost : 0
    },
    glass: {
        quantity : 0,
        price : 0,
        totCost : 0
    },
    metalBrackets: {
        quantity : 0,
        price : 0,
        totCost : 0
    },
    drawerSlides: {
        quantity : 0,
        price : 0,
        totCost : 0
    }
 }   
};


function calcTotPrice(){
    
    for (var mat in materialList){
        totalMaterialsCost += materialList[mat].totCost;
        
    } 
    
    return
}

 function getMaterials(doc){
       
    if(!doc){
        return
    }
    if(doc.wood){
        materialList.wood.quantity += doc.wood;
        materialList.wood.totCost += doc.wood * materialList.wood.price;
    }
    if(doc.screws){
        materialList.screws.quantity += doc.screws;
        materialList.screws.totCost += doc.screws * materialList.screws.price;

    }
    if(doc.hinges){
        materialList.hinges.quantity += doc.hinges;
        materialList.hinges.totCost += doc.hinges * materialList.hinges.price;

    }
    if(doc.glass){
        materialList.glass.quantity += doc.glass;
        materialList.glass.totCost += doc.glass * materialList.glass.price;

    }
    if(doc.metalBrackets){
        materialList.metalBrackets.quantity += doc.metalBrackets;
        materialList.metalBrackets.totCost += doc.metalBrackets * materialList.metalBrackets.price;

    }
    if(doc.drawerSlides){
        materialList.drawerSlides.quantity += doc.drawerSlides;
        materialList.drawerSlides.totCost += doc.drawerSlides * materialList.drawerSlides.price;

    }
       
    return
     
}

async function popMaterials(){
    try {
        var screw = await Material.findOne({name: 'Screws'}).select('pricePerUnit -_id');
        var hinges = await Material.findOne({name: 'Hinge'}).select('pricePerUnit -_id');
        var metalBrackets = await Material.findOne({name: 'Metal Brackets'}).select('pricePerUnit -_id');
        var glass = await Material.findOne({name: 'Drawer Slides'}).select('pricePerUnit -_id');
        var drawerSlides= await Material.findOne({name: 'Glass'}).select('pricePerUnit -_id');  

        materialList.screws.price = screw.pricePerUnit;
        materialList.hinges.price = hinges.pricePerUnit;
        materialList.metalBrackets.price = metalBrackets.pricePerUnit;
        materialList.glass.price = glass.pricePerUnit;
        materialList.drawerSlides.price = drawerSlides.pricePerUnit;      

    } catch (error) {
        console.log(error);
    }

    return
}

const getCabPrice = async (req,res) => {
    //pull fields from request body
    const {
        frameType,
        woodType,
        doorType,
        doorStyle,
        drawerStyle,
        woGrain,
        numDrawers         
    }= req.body;

    try {


        //clear materialList and total cost for next calculation       
        //Object.keys(Object.keys(materialList)).forEach(key => key = 0 );
        materialList = createMaterialList();
        totalMaterialsCost = 0;
        console.log(materialList);


        //populate data from db
        frame = await Frame.findOne({_id: `${frameType}`});
        door = await Door.findOne({_id: `${doorType}`});
        style= await DoorStyle.findOne({_id: `${doorStyle}`});
        if(numDrawers > 0){
            drawer = await Drawer.findOne({_id: `${drawerStyle}`}); 
        }
        wood = await Material.findOne({_id: `${woodType}`});        
        await popMaterials();
        
        //set price for wood and other materials in Material List
        materialList.wood.price = wood.pricePerUnit;       


        let merged = [frame,door,drawer];

        for (var obj in merged){
            getMaterials(merged[obj]);            
        }
        

        //calculate the total price from prices in materialList
        calcTotPrice();

        console.log(materialList);
        console.log(totalMaterialsCost);
        

    } catch (error) {
        console.log(error);
    }

    
    
    

    res.status(200).json({
        frameName: `${frame.name}`,
        doorTypeName: `${door.name}`,
        doorStyleName: `${style.name}`,        
        woodTypeName: `${wood.name}`,
        grain: `${woGrain}`,        
        materialsNeeded: [materialList],
        totalMaterialsCost: `$${totalMaterialsCost}`
    })
}



module.exports = {getCabPrice};