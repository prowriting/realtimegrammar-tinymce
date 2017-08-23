import {IGrammarChecker} from "../interfaces/IGrammarChecker";
import {ILanguage} from "../interfaces/ILanguage";
import {tinymceTranslate as t} from "../tinymceTranslate";

export class TinyMCESettingsWindowFactory{

    createSettingsWindow(
        width : number, height : number, checker : IGrammarChecker, activeTab : number = 0
    ) : any {
        let window = {
            title: t('realtime-settings-window-header', checker.getApplicationName(), checker.getApplicationVersion()),
            width, height,
            layout : 'fit',
            items : []
        };

        let form = {
            type : "form", data : checker.getSettings(), items : [],
            margin : "0 0 0 0", padding : "0 0 0 0"
        };

        let tabPanel = {
            type : "tabpanel",
            activeTab,
            layout : 'fit',
            items: []
        };

        tabPanel.items.push( this.createLanguageTab(checker) );
        tabPanel.items.push( this.createOptionsTab() );
        tabPanel.items.push( this.createAboutTab(checker) );

        form.items.push(tabPanel);

        window.items.push( form );

        return window;
    }

    createLanguageTab(checker : IGrammarChecker) {
        return {
            title: t('realtime-language-tab-label'),
            type : "form",
            items : [
                {type : "checkbox" , name: "checkSpelling",    text : t('realtime-check-spelling-label') },
                {type : "checkbox" , name: "checkGrammar",     text : t('realtime-check-grammar-label')  },
                {type : "checkbox" , name: "checkStyle",       text : t('realtime-check-style-label')    },

                {
                    type : 'listbox',  name : 'languageIsoCode', label : t('realtime-select-language-label'),
                    values : checker
                        .getAvailableLanguages()
                        .map((l:ILanguage)=>({type : 'menuitem',  text : l.displayName, value : l.isoCode }))
                }
            ]
        }
    }

    createOptionsTab() {
        return {
            type : 'form', title: t('realtime-options-tab-label'), //data : checker.getSettings(),
            items: [
                {type : "checkbox",  name: "checkerIsEnabled", text : 'Grammar Checker is started' }, //TODO i18n
                {
                    type : 'checkbox', name : "showThesaurusByDoubleClick",
                    text :  t('realtime-double-click-shows-thesaurus')
                },
            ]
        }
    }

    createAboutTab( checker : IGrammarChecker ) {
        return {
            type  : 'container',
            title : t('realtime-about-tab-label'),
            layout : 'flow',
            items: [
                { type : 'container', layout:'stack', items:[
                    { type : 'container', layout:'flow', items:[
                        { type : "container", style :"width : 128px; height : 128px; margin: 15px;",
                            html : `<img src="`+checker.getBrandImageUrl()+`" alt="Real-time Grammar Logo"/>` },
                        { type : 'container', layout:'stack', style:"padding : 10px", items:[
                            { type : 'label', style : "margin-top : 10px", text :  checker.getApplicationName() },
                            { type : 'label', style : "margin-top : 10px", text : `v${checker.getApplicationVersion()}` },
                        ]}

                    ]},
                    { type : 'container',
                        html: `Copyright &copy; ${(new Date()).getFullYear()} <a target="_blank" style="color:blue;" href="${checker.getCopyrightUrl()}">${checker.getCopyrightUrl()}</a>`,
                        style:"margin-left: 10px; float : left; clear: both;"
                    }
                ]}
            ]
        }
    }

}