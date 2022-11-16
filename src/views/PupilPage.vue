<template>
  <div class="about">
  <div class="table__box">
    <div class="table__head">
      <p>O'quvchilar ro'yxati</p>
      <el-button type="primary" @click="toggle = !toggle, pupil = {phone:'+998'}, editBtn = false">
        <el-icon><plus/></el-icon>
      </el-button>
    </div>
    <el-table :data="pupils" style="width: 100%">
      <el-table-column type="index" width="50" />
      <el-table-column prop="name" label="O'quvchi ismi"/>
      <el-table-column prop="phone" label="Telefon raqami"/>
      <el-table-column label="Guruh">
        <template #default="scope">
          {{ scope.row.group.title }}
        </template>
      </el-table-column>
      <el-table-column label="Tahrirlash" width="130px">
        <template #default="scope">
          <el-button icon="Edit" @click="edit(scope.row)" circle type="warning"/>
          <el-popconfirm 
            title="Rostdan ham o'chirmoqchimisiz?"
            confirm-button-text="Ha"
            cancel-button-text="Yo'q"
            @confirm="del(scope.row._id)">
            <template #reference>
              <el-button icon="Delete" circle type="danger"/>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    </div>
  </div>
  <el-dialog
    v-model="toggle"
    :title="`${editBtn?'O`quvchini tahrirlash':'Yangi O`quvchi'}`"
    width="30%"
  >
    <el-form
    :model="pupil">
      <el-form-item label="Yangi o`quvchi ismi">
        <el-input v-model="pupil.name" />
      </el-form-item>
      <el-form-item label="Telefon raqami">
        <el-input v-model="pupil.phone" v-maska="'+### (##) ###-##-##'"/>
      </el-form-item>
      <el-form-item label="Guruh">
        <el-select v-model="pupil.group" placeholder="Ro'yhatdan tanlang">
          <el-option
              v-for="item of groups"
              :key="item._id"
              :label="item.title"
              :value="item._id"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="toggle = false">Bekor Qilish</el-button>
        <el-button type="primary" @click="add" v-if="!editBtn">Qo'shish</el-button>
        <el-button type="primary" @click="save" v-if="editBtn">Saqlash</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>

export default {
  data() {
    return {
      toggle: false,
      pupil: {},
      editBtn: false
    }
  },
  computed: {
    pupils(){
      return this.$store.getters.pupils
    },
    status(){
      return this.$store.getters.status
    },
    who(){
      return this.$store.getters.who
    },
    groups(){
      return this.$store.getters.groups
    }
  },
  methods: {
    add(){
      this.$store.dispatch('addPupil', this.pupil)
      this.toggle = false
      this.$message({
        message: "Muvaffaqiyatli qo'shildi!",
        type: "success"
      })
    },
    del(_id){
      this.$store.dispatch('delPupil', _id)
      this.$message({
        message: "Muvaffaqiyatli o'chirildi!",
        type: "success"
      })
    },
    edit(pupil){
      this.pupil = pupil
      this.editBtn = true
      this.toggle = true
    },
    save(){
      this.$store.dispatch('savePupil', this.pupil)
      this.toggle = false
      this.editBtn = false
      this.$message({
        message: "Muvaffaqiyatli saqlandi!",
        type: "success"
      })
    }
  },
}
</script>