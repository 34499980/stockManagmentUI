import { NgModule } from "@angular/core";
import { NumberDirective } from "./only-numbers.directives";

@NgModule({
    declarations: [NumberDirective],
    exports: [NumberDirective],
    imports: []
})

export class DirectivesModule{}