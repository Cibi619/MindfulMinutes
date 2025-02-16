import { CommonModule, JsonPipe } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
    ],
    exports: [
        FormsModule,
        CommonModule,
    ]
})
export class CustomModule {

}