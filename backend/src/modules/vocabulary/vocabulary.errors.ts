export const vocabularyErrorCodes = {
    languagesNotFound: 'VOCABULARY_LANGUAGES_NOT_FOUND',
} as const;
    
    
    
    export class LanguagesNotFound extends Error {
        readonly code = vocabularyErrorCodes.languagesNotFound;
    
        constructor() {
            super('Languages not found');
            this.name = 'LanguagesNotFoundError';
        }
    }