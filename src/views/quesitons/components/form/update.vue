<template> 
  <div class="m-4">
    <form class="w-full max-w-sm">

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
        <a @click="update" class="btn btn-primary">Düzenle</a>
      </div>
    </form>   
  </div>   
</template>


<script>

import useUpdate from './updateValidate';
import { useRouter, useRoute } from "vue-router";
import useQuesitons from '../../../../compositions/useModelQuesitons'
import {onMounted} from 'vue'

export default {
    props: ["id"],
    setup(props, {  emit }){ 
        const {validate, errors, values} = useUpdate();
        const router = useRouter();
        const route  = useRoute();

        const {quesitonsLoading, quesitonsError, updateQuesitons, getQuesitons, quesitonsData} = useQuesitons();
        onMounted(() => {
          //values = 
          let item = quesitonsData.value.filter(item => item.id === props.id)[0];
          values.description = item.description
          values.img = item.img
        })

        const update = () => {
            validate().then(validateSuccess => {
                !validateSuccess.valid && console.log("formu kontrol ediniz.", errors.value) 
                if(validateSuccess.valid){
                    updateQuesitons({id:props.id,...values}).then(response => emit('id', null))
                }
            }).catch(validateError => {
                console.log(validateError);
            }) 
        }

        return {
            ...useUpdate(),
            update,
            quesitonsLoading,
            quesitonsError,
            quesitonsData,
            values
        }
    }
}
</script>