
'use client'
import { useEffect, useState } from 'react'
import { data, userData } from './data'
import _ from 'lodash'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import './styles.css'

// export default function CustomReport() {
//     const [newData, setNewData] = useState([])
//     const [baseValue, setBaseValue] = useState('date')
//     const [secondValue, setSecondValue] = useState('department')


//     useEffect(() => {
//         console.log(baseValue)
//         console.log(secondValue)
//     }, [baseValue, secondValue])

//     useEffect(() => {
//         // choose what to group by
//         const groupedBy = _.groupBy(data, baseValue);

//         const resultArray = Object.keys(groupedBy).map(groupByValue => {
//             const itemsBy = groupedBy[groupByValue];
//             // console.log('items by')
//             // console.log(itemsBy)
//             const groupedByDepartment = _.groupBy(itemsBy, secondValue);

//             const departmentArray = Object.keys(groupedByDepartment).map(department => {
//                 const itemsInDepartment = groupedByDepartment[department];
//                 const totalWeight = _.sumBy(itemsInDepartment, 'weight');

//                 return {
//                     subRowName: department,
//                     items: itemsInDepartment,
//                     totalWeight: totalWeight,
//                     count: itemsInDepartment.length

//                 };
//             });

//             return {
//                 row: itemsBy[0][baseValue],
//                 subRow: departmentArray,
//                 count: departmentArray.length
//             };
//         });

//         console.log('result array')
//         console.log(resultArray)
//         setNewData(resultArray)
//     }, [baseValue, secondValue])

//     return (
//         // <div className='data_wrapper'>
           
//         //     <div className='data_container'>
//         //         <div className='w-full mb-2'>
//         //             <Select onValueChange={(val) => setBaseValue(val)}>
//         //                 <SelectTrigger className="w-[180px]">
//         //                     <SelectValue placeholder="first level" />
//         //                 </SelectTrigger>
//         //                 <SelectContent>
//         //                     <SelectItem value="department">Τμήμα</SelectItem>
//         //                     <SelectItem value="user">Χρήστης</SelectItem>
//         //                     <SelectItem value="date">Ημερομηνία</SelectItem>
//         //                     <SelectItem value="classification">Tμήμα</SelectItem>
//         //                     <SelectItem value="barcode">Barcode</SelectItem>
//         //                 </SelectContent>
//         //             </Select>
//         //         </div>
//         //         <div>
//         //             <Select onValueChange={(val) => setSecondValue(val)}>
//         //                 <SelectTrigger className="w-[180px]">
//         //                     <SelectValue placeholder="level 2" />
//         //                 </SelectTrigger>
//         //                 <SelectContent>
//         //                     <SelectItem value="user">User</SelectItem>
//         //                     <SelectItem value="date">Ημερομηνία</SelectItem>
//         //                     <SelectItem value="barcode">Barcode</SelectItem>
//         //                     <SelectItem value="classification">Είδος</SelectItem>
//         //                     <SelectItem value="department">Τμήμα</SelectItem>
//         //                 </SelectContent>
//         //             </Select>
//         //         </div>
//         //         {newData.map((item, index) => {
//         //             return (
//         //                 <div className='item_container' key={index}>
//         //                     <div className='item_header'>
//         //                         <p> 🐭 <span className='mr-2'>Ημ. Έκδοσης: </span> {`${item.row} `} <span className='font-bold mr-2'>{`(${item.count})`} </span></p>
//         //                     </div>
//         //                     <div className='item_body'>
//         //                         {item.subRow.map((item, index) => {
//         //                             return (
//         //                                 <div className='item_body_container' key={index}>
//         //                                     <div className='font-bold'>{`${item.subRowName} (${item.count}) `}</div>
//         //                                     {item.items.map((item, index1) => {
//         //                                         return (
//         //                                             <div className='item_body_line' key={index1}>
//         //                                                 <p className='font-bold block mr-4'>{`${index1 + 1}:`}</p>
//         //                                                 <span className='sub_item_container'>
//         //                                                     <p className='mr-2'>{"Χρήστης:"}</p>
//         //                                                     <p className='text-red-700'>{item.user}</p>
//         //                                                 </span>
//         //                                                 <span className='sub_item_container'>
//         //                                                     <p className='mr-2'>{"Είδος:"}</p>
//         //                                                     <p className='text-red-700'>{item.classification}</p>
//         //                                                 </span>
//         //                                                 <span className='sub_item_container'>
//         //                                                     <p className='mr-2'>{"Βάρος:"}</p>
//         //                                                     <p className='text-red-700'>{item.weight}</p>
//         //                                                 </span>
//         //                                             </div>
//         //                                         )
//         //                                     })}
//         //                                 </div>
//         //                             )
//         //                         })}
//         //                     </div>

//         //                 </div>
//         //             )
//         //         })}
//         //     </div>
//         // </div>
//         <div>

//         </div>
//     )
// }


export default function CustomReport() {
    const [newData, setNewData] = useState([])
        const [baseValue, setBaseValue] = useState('date')
        const [secondValue, setSecondValue] = useState('department')
    
    useEffect(() => {
                // choose what to group by
                const groupedBy = _.groupBy(data, baseValue);
        
                const resultArray = Object.keys(groupedBy).map(groupByValue => {
                    const itemsBy = groupedBy[groupByValue];
                   
                    const groupedByDepartment = _.groupBy(itemsBy, secondValue);
        
                    const departmentArray = Object.keys(groupedByDepartment).map(department => {
                        const itemsInDepartment = groupedByDepartment[department];
                        const totalWeight = _.sumBy(itemsInDepartment, 'weight');
        
                        return {
                            subRowName: department,
                            items: itemsInDepartment,
                            total: totalWeight,
                            count: itemsInDepartment
        
                        };
                    });
        
                    return {
                        row: itemsBy[0][baseValue],
                        subRow: departmentArray,
                        count: departmentArray.length
                    };
                });
        
                console.log('result array')
                console.log(resultArray)
                setNewData(resultArray)
            }, [baseValue, secondValue])
    console.log(userData)
    return (
        <div>

        </div>
    )
}