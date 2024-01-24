import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

let idCount = 0;

export interface Character {
  id: number;
  name: string;
  image: string;
}

export const CharactersStore = signalStore(
  { providedIn: 'root' },
  withState({
    characters: [] as Character[],
  }),
  withMethods((state) => ({
    addCharacter(character: Pick<Character, 'name' | 'image'>) {
      const characterToAdd = {
        ...character,
        id: idCount++,
      };
      patchState(state, {
        characters: [...state.characters(), characterToAdd],
      });
    },
    removeCharacter(id: number) {
      patchState(state, {
        characters: state.characters().filter((c) => c.id !== id),
      });
    },
  }))
);
