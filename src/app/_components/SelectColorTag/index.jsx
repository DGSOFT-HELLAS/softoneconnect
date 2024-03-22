import styles from './styles.module.css'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"




const colors = [
    {
        label: 'Σημαντικό',
        color: '#4dc4da'
    },
    {
        label: 'Διακοπή',
        color: '#ff5733'
    },
    {
        label: 'Νέος Πελάτης',
        color: '#53af1e'
    },
    {
        label: 'Επανεφοδιασμός',
        color: '#f0d31b'
    }
    
]

export default function SelectColor({ onClick }) {
    return (
        <Select  onValueChange={(e) => console.log(e)}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
                  {colors.map((item, index) => (
                        <CustomItem   value={item.label} color={item.color} label={item.label}/>
                  
                  ))}
            </SelectContent>
        </Select>
    )
}


const CustomItem = ({color, label, value}) => {
    return (
       <SelectItem value={value}  className={styles.container}>
         <div className={styles.container}>
            <div className={styles.colorTag} style={{backgroundColor: color}}></div>
            <span>{label}</span>
         </div>
       </SelectItem>
    )
}