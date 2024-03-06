
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





const groupByFirstLevel = (items, secondValue) => {
    return _.groupBy(items, secondValue);
};

const calculateSecondArray = (groupedByFirstLevel) => {
    return Object.keys(groupedByFirstLevel).map(val => {
        const itemsInDepartment = groupedByFirstLevel[val];
        const totalWeight = _.sumBy(itemsInDepartment, 'weight');
        return {
            subRowName: val,
            items: itemsInDepartment,
            totalWeight: totalWeight,
            count: itemsInDepartment.length
        };
    });
};
const calculateThirdArray = (groupedBy, thirdValue) => {
    if(!thirdValue) return [];
    let items = groupedBy[0].items;
    let groupBy = _.groupBy(items, thirdValue )
    console.log('items')
    console.log(items);
    console.log('group by')
    console.log(groupBy);
    console.log(_.findKey(groupBy))
    const key =  _.findKey(groupBy)
    const totalWeight = _.sumBy(items, 'weight');
    const count = items.length;

    return {
        subSubRow: _.findKey(groupBy),
        count: count,
        weight: totalWeight,
        items: items

    }
   
};

const calculateResultArray = (groupedBy, baseValue, secondValue, thirdValue) => {
    return Object.keys(groupedBy).map(groupByValue => {
        const itemsBy = groupedBy[groupByValue];
        const groupedByFirstLevel = groupByFirstLevel(itemsBy, secondValue);
        //TOTAL WEIGHT FOR THE FIRST ARRAY:
        const totalWeight = _.sumBy(itemsBy, 'weight');
        
        const secondArray = calculateSecondArray(groupedByFirstLevel);
        
        const thirdArray = calculateThirdArray(secondArray, thirdValue);
        
        console.log(thirdArray)
       
        // const thirdArray = calculateThirdArray(thirdValue)

        return {
            count: secondArray.length,
            total: totalWeight,
            row: itemsBy[0][baseValue],
            subRow: secondArray,
            subSubRow: thirdArray,
           
        };
    });
};



export default function CustomReport() {
    const [newData, setNewData] = useState([])
    const [baseValue, setBaseValue] = useState('date')
    const [secondValue, setSecondValue] = useState('department')
    const [thirdValue, setThirdValue] = useState('classification')
    

    useEffect(() => {
        // console.log(baseValue)
        // console.log(secondValue)
    }, [baseValue, secondValue])

    useEffect(() => {
      

        const groupedBy = _.groupBy(data, baseValue);
    const resultArray = calculateResultArray(groupedBy, baseValue, secondValue, thirdValue);
    console.log(resultArray)
    setNewData(resultArray);
    }, [baseValue, secondValue, thirdValue])

    return (
        <div className='data_wrapper'>
           
            <div className='data_container'>
                <div className='w-full mb-2'>
                    <Select onValueChange={(val) => setBaseValue(val)}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="first level" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="department">Τμήμα</SelectItem>
                            <SelectItem value="user">Χρήστης</SelectItem>
                            <SelectItem value="date">Ημερομηνία</SelectItem>
                            <SelectItem value="classification">Tμήμα</SelectItem>
                            <SelectItem value="barcode">Barcode</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Select onValueChange={(val) => setSecondValue(val)}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="level 2" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="user">User</SelectItem>
                            <SelectItem value="date">Ημερομηνία</SelectItem>
                            <SelectItem value="barcode">Barcode</SelectItem>
                            <SelectItem value="classification">Είδος</SelectItem>
                            <SelectItem value="department">Τμήμα</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
               
                <div>
                    <Select onValueChange={(val) => setThirdValue(val)}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="level 3" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="user">User</SelectItem>
                            <SelectItem value="date">Ημερομηνία</SelectItem>
                            <SelectItem value="barcode">Barcode</SelectItem>
                            <SelectItem value="classification">Είδος</SelectItem>
                            <SelectItem value="department">Τμήμα</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
               
            </div>
        </div>
       
    )
}

