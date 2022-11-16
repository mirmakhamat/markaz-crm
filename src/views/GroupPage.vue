<template>
  <div class="about">
  <div class="table__box">
    <div class="table__head">
      <p>Guruhlar ro'yxati</p>
      <el-button type="primary" @click="toggle = !toggle, group = {status:1}, editBtn = false">
        <el-icon><plus/></el-icon>
      </el-button>
    </div>
    <el-table :data="groups" style="width: 100%">
      <el-table-column type="index" width="50" />
      <el-table-column prop="title" label="Guruh nomi"/>
      <el-table-column label="Yo'nalish">
        <template #default="scope">
          {{ scope.row.direction.title }}
        </template>
      </el-table-column>
      <el-table-column label="Xodim">
        <template #default="scope">
          {{ getWorker(scope.row.worker) }}
        </template>
      </el-table-column>
      <el-table-column label="Kurs narxi">
        <template #default="scope">
          {{ scope.row.price.toLocaleString() }} so'm
        </template>
      </el-table-column>
      <el-table-column label="Holati" width="130px">
        <template #default="scope">
          <el-tag :type="`${scope.row.status ? 'success': 'danger'}`">{{ status[scope.row.status] }}</el-tag>
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
    :title="`${editBtn?'Guruhni tahrirlash':'Yangi guruh'}`"
    width="30%"
  >
    <el-form
    :model="group">
      <el-form-item label="Yangi guruh nomi">
        <el-input v-model="group.title" />
      </el-form-item>
      <el-form-item label="Yo'nalish">
        <el-select v-model="group.direction" placeholder="Ro'yhatdan tanlang">
          <el-option
              v-for="item of directions"
              :key="item._id"
              :label="item.title"
              :value="item._id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="Xodim">
        <el-select v-model="group.worker" placeholder="Ro'yhatdan tanlang">
          <el-option
              v-for="item of workers"
              :key="item._id"
              :label="item.name"
              :value="item._id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="Kurs narxi">
        <el-input v-model="group.price" />
      </el-form-item>
      <el-form-item label="Guruh holati">
        <el-switch v-model="group.status" active-text="Aktiv" inactive-text="Noaktiv" :active-value="1" :inactive-value="0"/>
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
      group: {},
      editBtn: false
    }
  },
  computed: {
    groups(){
      return this.$store.getters.groups
    },
    status(){
      return this.$store.getters.status
    },
    who(){
      return this.$store.getters.who
    },
    directions(){
      return this.$store.getters.directions
    },
    workers(){
      return this.$store.getters.workers
    },
  },
  methods: {
    add(){
      this.$store.dispatch('addGroup', this.group)
      this.toggle = false
      this.$message({
        message: "Muvaffaqiyatli qo'shildi!",
        type: "success"
      })
    },
    del(_id){
      this.$store.dispatch('delGroup', _id)
      this.$message({
        message: "Muvaffaqiyatli o'chirildi!",
        type: "success"
      })
    },
    edit(group){
      this.group = group
      this.editBtn = true
      this.toggle = true
    },
    save(){
      this.$store.dispatch('saveGroup', this.group)
      this.toggle = false
      this.editBtn = false
      this.$message({
        message: "Muvaffaqiyatli saqlandi!",
        type: "success"
      })
    },
    getWorker(_id){
      return this.workers.find(item => item._id == _id).name
    }
  },
}
</script>