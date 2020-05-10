import { Component, OnInit } from "@angular/core";

declare const SwaggerUIBundle: any;

@Component({
    templateUrl: "./docs.component.html"
})
export class DocumentationComponent implements OnInit {
    constructor() { }

    ngOnInit() {
        const ui = SwaggerUIBundle({
            dom_id: '#swagger-editor',
            layout: 'BaseLayout',
            presets: [
                SwaggerUIBundle.presets.apis,
                SwaggerUIBundle.SwaggerUIStandalonePreset
            ],
            url: '/assets/docs/hn.v1.yaml',
            docExpansion: 'none',
            operationsSorter: 'alpha'
        })
    }
}