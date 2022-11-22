<template>
  <div class="about">
    <div class="table__box">
      <div class="table__head">
        <p>Chiqimlar ro'yxati</p>
        <el-button type="primary" @click="toggle = !toggle, spending = {}, editBtn = false">
          <el-icon><plus/></el-icon>
        </el-button>
      </div>
      <el-table :data="spendings" style="width: 100%">
        <el-table-column type="index" width="50" />
        <el-table-column label="Summa">
          <template #default="scope">
            {{ scope.row.summa.toLocaleString() }} so'm
          </template>
        </el-table-column>
        <el-table-column prop="comment" label="Izoh"/>
        <el-table-column label="Tahrirlash" width="130px">
          <template #default="scope">
            <el-button icon="Edit" @click="edit(scope.row)" circle type="warning"/>
            <el-popconfirm 
              title="Rostdan ham o'chirmoqchimisiz?"
              confirm-button-text="Ha"
              cancel-button-text="Yo'q"
              confirm-button-type="danger"
              cancel-button-type="primary"
              @confirm="del(scope.row._id)">
              <template #reference>
                <el-button icon="Delete" circle type="danger"/>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <div class="table__foot">
        <span>Umumiy summa</span>
        <span>{{ getAllSum.toLocaleString() }} so'm</span>
      </div>
    </div>
  </div>
  <el-dialog
    v-model="toggle"
    :title="`${editBtn?'Chiqim tahrirlash':'Yangi chiqim'}`"
    width="30%"
  >
    <el-form
    :model="spending">
      <el-form-item label="Chiqim summasi">
        <el-input v-model="spending.summa" :formatter="formatter"/>
      </el-form-item>
      <el-form-item label="Izoh">
        <el-input v-model="spending.comment" type="textarea"/>
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
      spending: {},
      editBtn: false
    }
  },
  computed: {
    spendings(){
      return this.$store.getters.spendings
    },
    status(){
      return this.$store.getters.status
    },
    who(){
      return this.$store.getters.who
    },
    getAllSum(){
      let summa = 0
      this.$store.getters.spendings.forEach(el => {summa += el.summa})
      return summa
    }
  },
  methods: {
    add(){
      this.spending.summa = this.spending.summa.split(' ').join('')*1
      this.$store.dispatch('addSpending', this.spending)
      this.toggle = false
      this.$message({
        message: "Muvaffaqiyatli qo'shildi!",
        type: "success"
      })
    },
    del(_id){
      this.$store.dispatch('delSpending', _id)
      this.$message({
        message: "Muvaffaqiyatli o'chirildi!",
        type: "success"
      })
    },
    edit(spending){
      this.spending = {...spending}
      this.editBtn = true
      this.toggle = true
    },
    save(){
      if(typeof this.spending.summa == 'string')
        this.spending.summa = this.spending.summa.split(' ').join('')*1
      this.$store.dispatch('saveSpending', this.spending)
      this.toggle = false
      this.editBtn = false
      this.$message({
        message: "Muvaffaqiyatli saqlandi!",
        type: "success"
      })
    },
    formatter(str=''){
        return str.split(' ').join('').replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
  }
}
</script>

<style lang="scss">

</style>