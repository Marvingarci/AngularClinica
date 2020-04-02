import { FormGroup } from '@angular/forms';


export const FormTools = {
    focusElement: (fg: FormGroup, element : string) =>{

        setTimeout((fg2: any, element2: any)=> {fg2.get(element2).nativeElement.focus()
        }, 100, fg, element);
        
    },
    validatorForm: (fg: FormGroup)=>{
        let first: any ;
        Object.keys(fg.controls).forEach(field => {
            const control = fg.get(field);
            control.markAsTouched({ onlySelf: true});

            if(!first) {
                first = fg.get(field).invalid ? field : null;
            }
        });

        if(first) {
            (fg.get(first) as any).nativeElement.focus();
        }
    }
}