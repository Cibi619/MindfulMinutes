import { CommonModule, JsonPipe } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        HttpClientModule
    ],
    exports: [
        FormsModule,
        CommonModule,
    ]
})
export class CustomModule {

}