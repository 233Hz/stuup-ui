<!-- <template>
  <div>
    <el-card>
      <el-row>
        <el-col :span="24">
          <el-form ref="searchFormRef" :model="search">
            <el-row>
              <el-col :sm="24" :md="12" :xl="8">
                <el-form-item label="一级项目" prop="firstLevelId">
                  <el-select
                    v-model="searchForm.firstLevelId"
                    @change="
                      (id: number) => {
                        growthStore.handleLevel1Change(id)
                        searchForm.secondLevelId = void 0
                        searchForm.thirdLevelId = void 0
                      }
                    "
                    style="width: 100%"
                  >
                    <el-option
                      v-for="item in growthStore.level1"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :sm="24" :md="12" :xl="8">
                <el-form-item>
                  <el-space>
                    <el-button
                      type="primary"
                      @click="fetchList"
                      :loading="loading"
                    >
                      <el-icon><Search /></el-icon>
                      查询
                    </el-button>
                    <el-button @click="searchFormRef?.resetFields()">
                      <el-icon><Close /></el-icon>
                      清空
                    </el-button>
                  </el-space>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
    <el-card>2</el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const searchFormRef = ref()
const search = ref({})
</script>

<style scoped lang="scss">
.el-card {
  margin: 10px;
}
</style> -->
