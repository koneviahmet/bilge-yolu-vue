import { ref, reactive, watch, onMounted, computed } from "vue";
import QuesitonsServices from "../services/QuesitonsServices";
import store from "../store/index.js";
import Alert from "../utils/alert.js";
import { notyfError, notyfSuccess } from "../utils/notyf.js";

export default function () {
  const loading = ref(false);
  const data = reactive({ list: [] });
  const error = ref(false);

  watch(data, () => {
    store.commit("addQuesitons", [...data.list])
    //console.log("changed",store.getters._getQuesitons);
  })



  const getItems = async () => {
    loading.value = true;
    return new Promise(async (resolve, reject) => {
      loading.value = false;
      resolve([...store.getters._getQuesitons]); 
    });
  };


  const searchItems = async (obj) => {
    loading.value = true;
    return new Promise(async (resolve, reject) => {
      await QuesitonsServices.searchItems(obj)
        .then((response) => {
          loading.value = false;
          if (response && !response?.error) {
            data.list = [...response];
            resolve([...response]); 
        }else{
          if(response?.error){
            error.value = response.error;
            reject(response.error);
          }else{
            const systemError = "Sistemden kaynaklanan bir hata oldu";
            if (response?.error){
              error.value = response.error;
              reject(response.error);
            }
            
            error.value = systemError;
            reject(systemError)
          }
        }
        })
        .catch((error) => {
          loading.value = false;
          error.value = error;
          reject(error);
        });
    });
  };

  const getItem = async (obj) => {
    loading.value = true;
    return new Promise(async (resolve, reject) => {
      loading.value = false;
      resolve(store.getters._getQuesitons); 
    });
  };

  // add new user
  const addItem = async (obj) => {

    obj = {...obj, id: Math.floor(Math.random() * 100000000)}
    console.log(obj);
    loading.value = true;
    return new Promise(async (resolve, reject) => {
      addStoreData(obj)
      resolve({ ...obj });
      loading.value = true;
    });
  };

  const updateItem = async (obj) => {
    loading.value = true;
    return new Promise(async (resolve, reject) => {
      loading.value = false;
      updateStoreData(obj)
      resolve(store.getters._getQuesitons);
    });
  };


  const confirmDelete = (obj) => {
    return new Promise(async () => {
      Alert.showPrompt("Are you sure you want to delete?").then((res) => {
        if(!res.isConfirmed){
          notyfError("you gave up")
        }else{
          deleteItem(obj)
        }
      });
    })
  }

  const deleteItem = async (obj) => {

    loading.value = true;
    return new Promise(async (resolve, reject) => {
          deleteStoreData(obj.id)
          resolve([...data.list.filter((i) => i.id != obj.id)]);
          loading.value = false;
    });
  };


  const confirmDeleteAll = (obj) => {
    return new Promise(async () => {
      Alert.showPrompt("Are you sure you want to delete?").then((res) => {
        if(!res.isConfirmed){
          notyfError("you gave up")
        }else{
          deleteAll()
        }
      });
    })
  }

  const deleteAll = async () => {
    loading.value = true;
    return new Promise(async (resolve, reject) => {
          data.list = []
          resolve([]);
          loading.value = false;
    });
  };

  const addStoreData = (item) => {
    data.list = [...getStoreData.value, item]
  } 

  const updateStoreData = (item) => {
    const index = getStoreData.value.map(i => i.id).indexOf(item.id);
    getStoreData.value[index] = item;
    data.list = getStoreData.value;
  }

  const deleteStoreData = (id) => {
    data.list = [...getStoreData.value.filter((i) => i.id != id)];
  }

  const getStoreData = computed(() => {
    return store.getters._getQuesitons;
  })

  return {
    quesitonsError: error,
    quesitonsLoading: loading,
    //quesitonsData: toRefs(data).list,
    quesitonsData: getStoreData,
    getQuesitons: getItem,
    searchQuesitonss: searchItems,
    getQuesitonss: getItems,
    addQuesitons: addItem,
    updateQuesitons: updateItem,
    deleteQuesitons: confirmDelete,
    confirmDeleteAll
  };
}
