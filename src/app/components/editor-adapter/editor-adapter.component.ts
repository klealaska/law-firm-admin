
import { environment } from './../../../environments/environment';
import { AfterViewInit, OnDestroy, Component, ElementRef, EventEmitter, Output, ViewChild, Injectable, Input } from '@angular/core';
import { CKEditor5 } from '@ckeditor/ckeditor5-angular';
import * as ClassicEditorBuild from './../../config-files/ckEditor-config-file/vendor/build/ckeditor.js';
import { getTrackChangesAdapter } from './editor-adapter';
import { HttpClient } from '@angular/common/http';


@Component({
	selector: 'app-editor-adapter',
	templateUrl: './editor-adapter.component.html',
	styleUrls: ['./editor-adapter.component.scss']
})
@Injectable()
export class EditorAdapterComponent implements AfterViewInit, OnDestroy {

	@Output() public ready = new EventEmitter<CKEditor5.Editor>();
	@Input() data = [];
	@Input() extraPlugins = [];
	@ViewChild('sidebar', { static: true }) private sidebarContainer?: ElementRef<HTMLDivElement>;


	public Editor = ClassicEditorBuild;
	public editor?: CKEditor5.Editor;
	licenseKey = environment.CKeditorLicenseKey;
	// public data = this.getInitialData();


	public get editorConfig() {
		return {
			extraPlugins: this.extraPlugins,
			sidebar: {
				container: this.sidebar,
			},
			licenseKey: environment.CKeditorLicenseKey
		};
	}

	private readonly STORAGE_KEY = 'ckeditor-license-key';


	// Note that Angular refs can be used once the view is initialized so we need to create
	// this container and use in the above editor configuration to work around this problem.
	private sidebar = document.createElement('div');

	private boundRefreshDisplayMode = this.refreshDisplayMode.bind(this);
	private boundCheckPendingActions = this.checkPendingActions.bind(this);


	constructor(private http: HttpClient) {
	}
	public ngOnInit() { }

	public ngAfterViewInit() {
		if (!this.sidebarContainer) {
			throw new Error('Div container for sidebar was not found');
		}

		this.sidebarContainer.nativeElement.appendChild(this.sidebar);
	}

	public ngOnDestroy() {
		window.removeEventListener('resize', this.boundRefreshDisplayMode);
		window.removeEventListener('beforeunload', this.boundCheckPendingActions);
	}

	public onReady(editor: CKEditor5.Editor) {
		this.editor = editor;
		this.ready.emit(editor);

		// Make the track changes mode the "default" state by turning it on right after the editor initializes.
		this.editor.execute('trackChanges');

		// Prevent closing the tab when any action is pending.
		window.addEventListener('beforeunload', this.boundCheckPendingActions);

		// Switch between inline and sidebar annotations according to the window size.
		window.addEventListener('resize', this.boundRefreshDisplayMode);
		this.refreshDisplayMode();
	}

	public resetLicenseKey() {
		window.localStorage.removeItem(this.STORAGE_KEY);
		window.location.reload();
	}

	private checkPendingActions(domEvt) {
		if (this.editor.plugins.get('PendingActions').hasAny) {
			domEvt.preventDefault();
			domEvt.returnValue = true;
		}
	}

	private refreshDisplayMode() {
		const annotations = this.editor.plugins.get('Annotations');
		const sidebarElement = this.sidebarContainer.nativeElement;

		if (window.innerWidth < 1070) {
			sidebarElement.classList.remove('narrow');
			sidebarElement.classList.add('hidden');
			annotations.switchTo('inline');
		}
		else if (window.innerWidth < 1300) {
			sidebarElement.classList.remove('hidden');
			sidebarElement.classList.add('narrow');
			annotations.switchTo('narrowSidebar');
		}
		else {
			sidebarElement.classList.remove('hidden', 'narrow');
			annotations.switchTo('wideSidebar');
		}
	}
}

