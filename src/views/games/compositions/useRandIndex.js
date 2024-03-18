import { ref, computed, reactive} from "vue";

export default function () {
  const error             = ref(false)
  const length            = ref(5)
  const selectingIndex    = ref([]) //şu anda seçilen indexler
  const selectedIndexes   = ref([]) //daha önce Seçilen indexler
  const selectableIndexes = ref([]) //seçilebilir indexler
  const excludedIndexes   = ref([]) //seçilmesini istemediklerimiz burada olacak
  const selectableSize    = ref(1)  //kaç index seçileceğiz

  const allIndexes = computed(() => {
    return reactive(Array.from({ length: length.value }, (_, index) => index).filter(i => !excludedIndexes.value.includes(i)));
  })

  const getRandomSelectIndex = () => {
    const newArr = [...allIndexes.value]
    return shuffle(newArr).splice(0, selectableSize.value)
  }

  const setSelectableIndex = (size) => {
      error.value = false
      if (allIndexes.value.length < size){
        error.value = true
        return false
      }

      if (selectableIndexes.value.length == 0) {
        selectedIndexes.value = []
        return shuffle(allIndexes.value)
      }

      //sıfırdan büyük ama istenilenden küçüktür
      if (selectableIndexes.value.length < size) {
        return  [...selectableIndexes.value, ...shuffle(allIndexes.value)]
      }


      return selectableIndexes.value
  }


  const select = () => {
    const selectable = [...setSelectableIndex(selectableSize.value)].filter(i => !excludedIndexes.value.includes(i))
    const selected = selectable.splice(0, selectableSize.value)
    selectableIndexes.value = selectable
    selectedIndexes.value = [...selectedIndexes.value, ...selected]
    selectingIndex.value   = selected
  }


  const  shuffle = (array) => {
    let currentIndex = array.length,  randomIndex;
      while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  return {
    selectedIndexError: error,
    allIndexes,
    selectableLength:length,
    excludedIndexes,
    selectableIndexes,
    select,
    selectingIndex,
    getRandomSelectIndex,
    selectableSize
  };
}
