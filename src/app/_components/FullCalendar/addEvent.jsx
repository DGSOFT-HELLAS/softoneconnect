
import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {Form} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Label } from '@/components/ui/label';
import { Textarea } from "@/components/ui/textarea"
import DateTime from "../DateTimePicker"

export default function AddEvent({ open, setOpen, selectedDate }) {

	const form = useForm({
		resolver: zodResolver(),
		defaultValues: {
			name: "",

		},
	})


	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle className="mb-4">Προσθήκη Event</DialogTitle>
								<div className="grid w-full max-w-sm items-center gap-1 mb-2">
									<Label htmlFor="email">Tίτλος</Label>
									<Input type="email" id="email" />
								</div>
								<div className="grid w-full gap-1">
									<Label htmlFor="message">Λεπτομέριες</Label>
									<Textarea placeholder="Δώστε μια περιγραφή για το event." id="message" />
								</div>
								< DateTime label="Έναρξη" selectedDate={selectedDate}/>
								< DateTime label="Λήξη" selectedDate={selectedDate}/>
								
				</DialogHeader>
				
				<DialogFooter className="sm:justify-start">
					<DialogClose asChild>
						<Button type="button" variant="secondary">
							Κλέισιμο
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

