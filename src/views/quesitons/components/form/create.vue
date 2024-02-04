<template> 
  <div class="m-4">
    <form class="w-full">
      <div class="alert alert-error my-4" v-if="quesitonsError">
        <div class="flex-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-6 h-6 mx-2 stroke-current">    
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path>                      
          </svg> 
          <label>{{quesitonsError}}</label>
        </div>
      </div>

      <!--form-->
        <div class="form-control">
          <label class="label">
            <span class="label-text">Açıklama</span>
          </label> 
          <textarea class="textarea textarea-bordered" v-model="description" placeholder="Açıklama"></textarea>

          <label class="label">
            <span class="label-text-alt text-red-400">{{ errorDescription }}</span>
          </label>
        </div>
      <!--#form-->

      <!--form-->
        <div class="form-control">
          <label class="label">
            <span class="label-text">Resim</span>
          </label> 
          <input type="text" placeholder="Resim" v-model="img" class="input input-bordered">
          <label class="label">
            <span class="label-text-alt text-red-400">{{ errorImg }}</span>
          </label>
        </div>
      <!--#form-->

      <!--form-->
        <div class="form-control">
          <label class="label">
            <span class="label-text">Puan</span>
          </label> 
          <input type="text" placeholder="Puan" v-model="point" class="input input-bordered">
          <label class="label">
            <span class="label-text-alt text-red-400">{{ errorPoint }}</span>
          </label>
        </div>
      <!--#form-->


      <!--add-->

      <div class="form-control mt-6">
        <a @click="save" class="btn btn-primary">Ekle</a>
      </div>
    </form>    
  </div>   
</template>


<script>

import useCreate from './createValidate';
import { useRouter } from "vue-router";
import { onMounted } from "vue";
import useQuesitons from '../../../../compositions/useModelQuesitons'

export default {
    setup(){ 
        const {validate, errors, values} = useCreate();
        const router = useRouter();
        const {quesitonsLoading, quesitonsError, addQuesitons} = useQuesitons();
       
        onMounted(() => {
          values.point = 100
        })

        const save = () => {
            validate().then(validateSuccess => {
                !validateSuccess.valid && console.log("Check the form.", errors.value) 
                if(validateSuccess.valid){
                    addQuesitons({...values}).then(response => {
                      console.log('Eklendi')
                      values.description = ""
                      values.img = ""
                      values.point = ""
                    })
                }
            }).catch(validateError => {
                console.log(validateError);
            }) 
        }

        return {
            ...useCreate(),
            save,
            quesitonsLoading,
            quesitonsError
        }
    }
}
</script>