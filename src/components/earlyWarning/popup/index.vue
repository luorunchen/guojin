<template>
  <div id="popup">
    <div class="info">
      <el-dialog v-model="dialogVisible" :title="title" width="30%">
        <div
          v-loading="loading"
          element-loading-text="Loading..."
          :element-loading-spinner="svg"
          element-loading-svg-view-box="-10, -10, 50, 50"
          element-loading-background="rgba(4, 19, 54)"
        >
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="scroll">
                <div
                  @click="devicesInfo(item.devId, item.dSid)"
                  class="box"
                  v-for="(item, index) in type != 5
                    ? getDeviceList
                    : GetMapDataList.mess"
                  :key="index"
                >
                  <el-row :gutter="10">
                    <el-col :span="8">
                      <div
                        class="imgBox"
                        v-if="item.dSid == 2 || item.dSid == 45"
                      >
                        <img
                          :src="
                            item.typeName == '正常'
                              ? 'http://psy119.cn/lingdong1/static/img/yangan_zhengchang.f03803ec.png'
                              : item.typeName != ''
                              ? 'http://psy119.cn/lingdong1/static/img/yangan_baojing.f42dd8fc.png'
                              : 'http://psy119.cn/lingdong1/static/img/yangan_lixian.9f4112d3.png'
                          "
                          alt=""
                        />
                      </div>

                      <div
                        class="imgBox"
                        v-else-if="item.dSid == 4 || item.dSid == 42"
                      >
                        <img
                          :src="
                            item.typeName == '正常'
                              ? 'http://psy119.cn/lingdong1/static/img/shuiya_zhengchang.722c1948.png'
                              : item.typeName != ''
                              ? 'http://psy119.cn/lingdong1/static/img/shuiya_baojing.ce1ee5fd.png'
                              : 'http://psy119.cn/lingdong1/static/img/shuiya_lixian.be4d8c9e.png'
                          "
                          alt=""
                        />
                      </div>
                      <div
                        class="imgBox"
                        v-else-if="
                          item.dSid == 6 || item.dSid == 11 || item.dSid == 1
                        "
                      >
                        <img
                          :src="
                            item.typeName == '正常'
                              ? 'http://psy119.cn/lingdong1/static/img/ranqi_zhengchang.d71304a3.png'
                              : item.typeName != ''
                              ? 'http://psy119.cn/lingdong1/static/img/ranqi_baojing.13efa111.png'
                              : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKgAAACoCAMAAABDlVWGAAACwVBMVEUAAAD///+AgICqqqq/v7+qqqq2tra5ubmqqqqxsbGvr6+0tLS4uLiurq6zs7O2traurq6ysrK0tLSvr6+xsbGzs7OwsLCxsbG1tbWxsbGxsbGysrKxsbGysrKzs7OwsLC0tLSxsbGzs7OxsbGysrKzs7OysrKzs7Ozs7OxsbGysrKzs7OysrKysrKzs7OysrKzs7OxsbGzs7OxsbGysrKysrKysrKysrKysrKzs7OxsbGysrKysrKysrKysrKzs7OxsbGysrKxsbGzs7OysrKysrKzs7OysrKxsbGysrKysrKzs7OysrKysrKzs7OysrKysrKysrKzs7Ozs7OysrKysrKxsbGysrKysrKysrKysrKysrKysrKysrKxsbGysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKxsbGysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKWlpaYmJicnJydnZ2enp6fn5+goKChoaGioqKjo6OkpKSlpaWmpqanp6eoqKipqamqqqqrq6usrKytra2urq6vr6+wsLCxsbGysrKzs7O0tLS1tbW2tra3t7e4uLi5ubm6urq7u7u8vLy9vb2+vr6/v7/AwMDBwcHCwsLDw8PExMTFxcXGxsbHx8fIyMjJycnKysrLy8vMzMzNzc3Ozs7Pz8/Q0NDR0dHS0tLT09PU1NTV1dXW1tbX19fY2NjZ2dna2trb29vc3Nzd3d3e3t7f39/g4ODh4eHi4uLj4+Pk5OTl5eXm5ubn5+fo6Ojp6enq6urr6+vs7Ozt7e3u7u7v7+/w8PDx8fHy8vLz8/P09PT19fX29vb39/f4+Pj5+fn6+vr7+/v8/Pz9/f3+/v7////aN6xUAAAAhXRSTlMAAQIDBAYHCwwNEBESExQVFiEiIyQlLS4wMTQ/QUJDREdISktMTU9QUVJTVGZnaG1yc3V2d4GCh4iJjY6PkZWWl5manZ6foKOkra+xsrO0trm6u76/wcLExsjJysvMz9DR0tPU1drc3d/h4+Tl5ufo6err7e7v8PHy8/T19vf4+fr7/P3+mwCzBwAAC8JJREFUeNrtnWlb20gSx6uqJUvybQPmSgKTZDKZ+f6fZWd3JwmXSWAM+JJsWVJX7QtwuGzZEvIgnqXfJPjR8aOqq/pfpZZBmA5DlWrVaqVesk2CZx0SBpPRwB30++Mo+ok3/Y8qWdVKpVGvV/fh2cep61oFRDUMhvrmI7z5l+qtemvNKpX2IB/jcOT5V53eeY/vWbRUXdvc380LJADAPgAcfT9U1sC79jgAABTXdz7s7byDnI062LZwGE5BsdTY/fjpjxrkbtR2DApDjm5AS2u7n/beQy5HQ8xQRyGAAijUdz7sfYCcjqbGwA80KDBrrQ8fPkJuR5OjcRiygXZrdzfHnAAfPU+CyLCK9b0NyPXYmAwvAlVv7H/azTdoRYZDbdQqa28g5+PNSUUblZoFuR+FqjZq9XL+QSt1NioNO/+gdiM06tVC/kHN6oSc0nb+QbdLDlkvwPMAtk3m9ksA3TZJwYsYRPBCxivoK+gr6CvoK+gr6Cvos4MKy+pAjUxBEehnxzXHFlUGcLQqq2ZmURGyrNANYUVGzc71DM4OnncCLSshzRBUjLVSrXA20qJWQJoZKILWaDSKtZNBFJKi/FoUZTIRtN9vHLVHjJTbqEfEcMQAWPn4awPDiHOcnlgzAKD99vOOEWRNml16AgCFAABobZXsowAMyqdFRdT0ISpVP//uaJ1p7s/QomgUpr82Ou/Vn74YGaapDN2D5p3f2tz7bEaR5M/1AoDG3faQuffJ0BlGVGYWFVTWvT5WYf8Xk3MHKgJoO/cbbs7+OrFI3lzP6JTvg2JtrwqZhX5WUS+CTuVBC1Ntun4odDuJ8+B6ZioWH5JYb9eRpyaVp82CzFwvVDQffVp+76iIAUSQgLU8O6iIoF1+7FrceKciFhEgy0Kt+fktiqpamXX5z44CEQFymk2bI/28oCJiOJszH1XSfhk1iwg137+xnmDSbCyqQ9Vcm32p/U3SWiT0Vev9TkGnnqcZWZRh15mT/7ZsYdHjocvV95sqSkuaUTCh1ZyTJbG+ZiBK5A9GUN1vAD8fqAiT3Zr7MN1qlQ1hFH/E1HxTBE6H+nRQFM1Y35t7IdVYL7AQReMQCttvTBaQfwpU5N4yozVtx+zuKrUKmgElDARLv7SIUymVdKB8R2uIINVbMdehsqNABEQAsPJrA1IlKUphTkC84z0GtN5W4s6w6zYJw7Wubn5wUgUUpQlxu1g0kacNkpA212MvY1Srpo7INBEAcHPXgBSCOg0oORtbdbzO3cwi9k45VsGpWt0II7KMmxpl3fhHQEWksP5uXWkWEWEWs9WMvwqWqsRsWNdHYXmvlCLuU4AyY6m2VtBaEIVZNectSre+t0jQnqpAtb5RwMTKP03UC5lUchSAiDBbO2sLpTsilW832Vjv6sKrB72OX1UskDAzU3NncTmjio3tdfO2mNoq6KSCz0gxR8lRoIrOSFhrqn4qLT7H2W6sVW8rKto5DzQIrhRURIyyAapY9CMd6cofjSVOKu6JcfdOpb1+IMmKvRSuV7ZNgLZNUQTOL5vL3E5Z9n2LbG6YYTLBlxSUWVlVGwDMAoRs7e6lq7fND0bCFZ8S5yaqrFsAYBigqf6uklJyNSoFSpRNU4DWmgYAEAo6mzNTvZ4sbuPhmzIlSlFJXS9g1IoAABJoe31rplwOL04Hi9ZI3GqSSILAp4QhD1RpEACAjrCxV5t5o+jq21/9RZcqtBRzAucbyTiZ7K3qTW5sNTdmn0087PIfi/bPlsuj1eVR5kJzW10nqdZ6cc7OU+WYXlv9Fk+KTrPLCZJ+MlDR6s31QiRWQeGcu5DtuOO2+liKpTBrRS9B0qdkkaSczWkLxyCcK0GUQf7JVzd2BlK1rhKEPSVyPBZ3zClMjC20RgPGJ8d+rO+LDWM1oMysGsvs2ecwBGXg+PRHFDvrKmaCnmkii4rZKi4zQyYTIaXQPejEpVO0bISlExQlmaFUXl/meJ4Emkgp3f3ixabSokmwrE0pCae1lEEh9DUAEhJf/CdOHxuOhStwvWaj3loqmwUTAQRApaIf3+Lu7ViUeTAhsFYbMZlRouBGYOpxBAgIRIT+oRs3SS3KfI6KABfq5vwDJled/nWQRyNNiACARDI+DGMmqYlLd8wSBJMqFWNy5/j85CK4jvkRE4oAAJLSp525JGgamasnYSanasZNzO755YQBgD2Xb3bNIynttedGPhkq+/QkTOV63MsFE9f1fAEAPRjq6bKFKPrqYv7NMfOoFxYql+JAx2OtJwwAQd/X8BOUMOjOl3MJXqtYPphUyYmbUV6APNEA4g4FphYVUAb0Onp+ByVrUBRRTtwUHbkB6zAS4M74zu2RUA8ug5hcknnCF4rLznI1FmANAJcXEd7Jjgg8cf254mEFxR3HTijv+0QpQykM20Omu0oVAX1Pz5HhehUyL1aAdjqBMk0Lwe3692U7IkW9yZzTopW4PuZQ72wckWEaMukG+OBAoqjn8RzdKkuH09JRH7eBgTs9BiII+2cdUQ9yIyEPZxclEoSAy1ZNmWzV6J1PFKHSg5Hr6oc1H4Iee3rWBBc/4KWruyxAwx9XYgBgONAT/XhDJooeBbMqa/Z9XlG5PHv0//YJASCK5jztEC+YVcDr8QSW3ry7tB6dX3b6564IIoJoocc1NCJgOJ7pibGWzF0vc4UjX7ajm53CMyNDgECP+fEklfFkFQ0IlDkV5ajtyRQU53hDxjPkc9ALE6jhZdUTEM+W6vqsIxifDZEkeJzy2e1GtIKaCbU/06S948nC2yGEj5d76V9GmD0oKT2aJYL04RXQguUFQaLH54ZXPmcv8wCRB0OeNUMnS6jKGaDSvViJHiXU3cvHraRJmxUtcTd+dGp47FOSxw3LgiLp8fDR3Xh4TuYyVnmUMuSkk+ytguUbEKIfawvd92S5yH145vhgjCqB5xPp0VHnYZIJ3YhT7QoNvrmcZIYmSfhKRWcXD6R6OOIlFeX9+3D7iBN+81mCREY8aD9YsyeBLBuM937sHPmiVgUKiPqifT8ownDpNHz3p8HJACnhlEkCSio8bN/7KFpSVSDd1aOjow4nfuEpyfFI4v3rTBIX5gJo3HkW6R+3R7BKiwIiiffnOd9TqctJxIJ9Z404HiEmzhWJPICkoPfv89vQV7jU2sJo27ech26aN92SlSJIwN3/8ub0LMNcph0nQs70DL99MFyoYjKomZCAr77o6cYcwyRZ9DwTmVnZN8d4J8dDTMOZGBRI9BXrnevgMGzFi567CggUrBsJevzdA6I0i1nSKhQRUPp/jfeLAACFYiFaJCqFURUtBADuHF4EiKk4U5TLRKyHX7zfKghgVZ3xIhHEQqWmAwDh2UEvolR+T1nXI3H03X23YyPV64NgocKz1jYUyPDoh68RU3KmBEUd9YLB27pR3Lzw43eGiFB5uwSTy5OLCWD6l4VTdUoQlIjXdt9uWWtr49g9YSJQaDaU1z4dMqU2Z+qWDgKK9i9CvWXV+oP4FV85RR58P3ZZPYUzbe8JAUX04Niva3sUSZxFzYJ/Oroag6KncD6hSUbIPAj6hSC+x4kYdiM/lCf5/UmgiMjihwboOAIE9kVzyuSZCSgAKpEojGdAYA1AT3/j9smvYGBGx6zSojd9RlxMic8N+o/Z8/W7dF5BX0H/D0HxpYDKK2jGoOHL4GQKTl8C54+QwtFLAPV98rwfL8Cg3tgYFoP8g4aDPnk9/wV4vjs0euTmH3TY6xtDNck/aDAYKqXKpWrOOdsHpz3FYBWxkmvO76cH34dKoy3FzVyDHnz9+3KkQLQUsJljzi+HB+euVsARgIJGbjm/HR6cdUNQAJpFG1DPKefh8dezK/96l3GoAyaq5ZLz+PDbyZUHN9uhA2E/GET5Qz35evTtrDuEKSgEkT+eEOfN/UenB4c/rjmnLZ3hyI/cv9tWufQ2L8b0XP+yMzjr3TzQ/FnbqUqhVqk1GpXKfh5CaDjsdvvD/u0fO/vZJNOuoTVL6Hu95/7zccChPxoMe4O+d/sFUf8DvZNXXuq8mB4AAAAASUVORK5CYII='
                          "
                          alt=""
                        />
                      </div>
                      <div
                        class="imgBox"
                        v-else-if="item.dSid == 8 || item.dSid == 43"
                      >
                        <img
                          :src="
                            item.typeName == '正常'
                              ? 'http://psy119.cn/lingdong1/static/img/%E6%B0%B4%E4%BD%8D@2x.26b98539.png'
                              : item.typeName != ''
                              ? 'http://psy119.cn/lingdong1/static/img/%E6%B0%B4%E4%BD%8D@2x.26b98539.png'
                              : 'http://psy119.cn/lingdong1/static/img/%E6%B0%B4%E4%BD%8D@2x.26b98539.png'
                          "
                          alt=""
                        />
                      </div>
                      <div
                        class="imgBox"
                        v-else-if="
                          item.dSid == 9 || item.dSid == 13 || item.dSid == 48
                        "
                      >
                        <img
                          :src="
                            item.typeName == '正常'
                              ? 'http://psy119.cn/lingdong1/static/img/%E8%A7%86%E9%A2%91@2x.3a0bb734.png'
                              : item.typeName != ''
                              ? 'http://psy119.cn/lingdong1/static/img/%E8%A7%86%E9%A2%91@2x.3a0bb734.png'
                              : 'http://psy119.cn/lingdong1/static/img/%E8%A7%86%E9%A2%91@2x.3a0bb734.png'
                          "
                          alt=""
                        />
                      </div>
                      <div class="imgBox" v-else-if="item.dSid == 10">
                        <img
                          :src="
                            item.typeName == '正常'
                              ? 'http://psy119.cn/lingdong1/static/img/menchi_zhengchang.789bde76.png'
                              : item.typeName != ''
                              ? 'http://psy119.cn/lingdong1/static/img/menchi_baojing.8e376b2c.png'
                              : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKgAAACoCAMAAABDlVWGAAACu1BMVEUAAAD///+AgICqqqq/v7+qqqq2tra5ubmqqqqxsbGvr6+0tLS4uLiurq6zs7O2traurq6ysrK0tLSvr6+xsbGzs7OwsLCxsbG1tbWxsbGxsbGysrKxsbGysrKzs7OwsLC0tLSxsbGzs7OxsbGysrKzs7OysrKzs7Ozs7OxsbGysrKzs7OysrKysrKzs7OysrKzs7OxsbGzs7OxsbGysrKysrKysrKysrKysrKzs7OxsbGysrKysrKysrKysrKzs7OxsbGysrKxsbGzs7OysrKysrKzs7OysrKxsbGysrKysrKzs7OysrKysrKzs7OysrKysrKysrKzs7Ozs7OysrKysrKxsbGysrKysrKysrKysrKysrKysrKysrKxsbGysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKxsbGysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKcnJydnZ2enp6fn5+goKChoaGioqKjo6OkpKSlpaWmpqanp6eoqKipqamqqqqrq6usrKytra2urq6vr6+wsLCxsbGysrKzs7O0tLS1tbW2tra3t7e4uLi5ubm6urq7u7u8vLy9vb2+vr6/v7/AwMDBwcHCwsLDw8PExMTFxcXGxsbHx8fIyMjJycnKysrLy8vMzMzNzc3Ozs7Pz8/Q0NDR0dHS0tLT09PU1NTV1dXW1tbX19fY2NjZ2dna2trb29vc3Nzd3d3e3t7f39/g4ODh4eHi4uLj4+Pk5OTl5eXm5ubn5+fo6Ojp6enq6urr6+vs7Ozt7e3u7u7v7+/w8PDx8fHy8vLz8/P09PT19fX29vb39/f4+Pj5+fn6+vr7+/v8/Pz9/f3+/v7///+zmX+1AAAAhXRSTlMAAQIDBAYHCwwNEBESExQVFiEiIyQlLS4wMTQ/QUJDREdISktMTU9QUVJTVGZnaG1yc3V2d4GCh4iJjY6PkZWWl5manZ6foKOkra+xsrO0trm6u76/wcLExsjJysvMz9DR0tPU1drc3d/h4+Tl5ufo6err7e7v8PHy8/T19vf4+fr7/P3+mwCzBwAAB5hJREFUeNrt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'
                          "
                          alt=""
                        />
                      </div>
                      <div class="imgBox" v-else-if="item.dSid == 15">
                        <img
                          :src="
                            item.typeName == '正常'
                              ? 'http://psy119.cn/lingdong1/static/img/%E8%A7%86%E9%A2%91@2x.3a0bb734.png'
                              : item.typeName != ''
                              ? 'http://psy119.cn/lingdong1/static/img/shengguan_baojing.8ea33e7a.png'
                              : 'http://psy119.cn/lingdong1/static/img/shengguang_lixian.639e33b4.png'
                          "
                          alt=""
                        />
                      </div>
                      <div class="imgBox" v-else-if="item.dSid == 16">
                        <img
                          :src="
                            item.typeName == '正常'
                              ? 'http://psy119.cn/lingdong1/static/img/shoudong_zhengchang.4c4cb27e.png'
                              : item.typeName != ''
                              ? 'http://psy119.cn/lingdong1/static/img/shoudong_baojing.16f1b93d.png'
                              : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKgAAACoCAMAAABDlVWGAAACr1BMVEUAAAD///+AgICqqqq/v7+qqqq2tra5ubmqqqqxsbGvr6+0tLS4uLiurq6zs7O2traurq6ysrK0tLSvr6+xsbGzs7OwsLCxsbG1tbWxsbGxsbGysrKxsbGysrKzs7OwsLC0tLSxsbGzs7OxsbGysrKzs7OysrKzs7Ozs7OxsbGysrKzs7OysrKysrKzs7OysrKzs7OxsbGzs7OxsbGysrKysrKysrKysrKysrKzs7OxsbGysrKysrKysrKysrKzs7OxsbGysrKxsbGzs7OysrKysrKzs7OysrKxsbGysrKysrKzs7OysrKysrKzs7OysrKysrKysrKzs7Ozs7OysrKysrKxsbGysrKysrKysrKysrKysrKysrKysrKxsbGysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKxsbGysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKgoKChoaGioqKjo6OkpKSlpaWmpqanp6eoqKipqamqqqqrq6usrKytra2urq6vr6+wsLCxsbGysrKzs7O0tLS1tbW2tra3t7e4uLi5ubm6urq7u7u8vLy9vb2+vr6/v7/AwMDBwcHCwsLDw8PExMTFxcXGxsbHx8fIyMjJycnKysrLy8vMzMzNzc3Ozs7Pz8/Q0NDR0dHS0tLT09PU1NTV1dXW1tbX19fY2NjZ2dna2trb29vc3Nzd3d3e3t7f39/g4ODh4eHi4uLj4+Pk5OTl5eXm5ubn5+fo6Ojp6enq6urr6+vs7Ozt7e3u7u7v7+/w8PDx8fHy8vLz8/P09PT19fX29vb39/f4+Pj5+fn6+vr7+/v8/Pz9/f3+/v7///9bLWO8AAAAhXRSTlMAAQIDBAYHCwwNEBESExQVFiEiIyQlLS4wMTQ/QUJDREdISktMTU9QUVJTVGZnaG1yc3V2d4GCh4iJjY6PkZWWl5manZ6foKOkra+xsrO0trm6u76/wcLExsjJysvMz9DR0tPU1drc3d/h4+Tl5ufo6err7e7v8PHy8/T19vf4+fr7/P3+mwCzBwAACVRJREFUeNrtnWtz2lgShvvtcwQyIMAQ27Gdmcxuqub//6GZZDOJ79jcJISk070fBNiOXVuKLBN5i/5iyoB46O7TNx0h0Fqsafe63aDf9j2mXyqaJstoOp9OJoss2+CtH5h2sxsE+/1+94R+uVzP580GYGbJzK3+hdVf7h/2D4fNdvuY6iFnURjfXo8vx/JIo+3u8OiP07pAEhGdENH52RfTnIa5xYmIqPXu5NPHk/dUMwmM76uk6VqjaPWPP/37lOonR0eDJjtEmmu0PTz98+MHqqV02UtdlhIZokb/5NPH36im0iMkceLIkNc7/PTpd6qt9JAt0lQs/MPT0xpzEv0ehppkttnqfzygWsvBcnaT2E7v8PRdvUHfydWNs71geEg1l8Nh4GzQa1LtpdF1ttfv1B806IsN9v36g/r7qe13G/UH9bpL3msP6w86bO9x8w1Ynsj32Ru+BdChx4behDDTG5Ed6A50B7oD3YHuQHegO9Ad6M+I/ZkXa6UfDVK8CqiqEKrjVCIAqBxUSUSqVKkSGIaKfndbXJ3KHohUUQkkCJAsAzOqBFUVbXQH3QYqc1BIMrkZZ6jY9KKNw9/6FZ4qA5EMumc3ToqptBioingH/xpU3LGadqPtnS/JVAmK7m+D6jtrb99dumJW4oIKtUeD15gAcMCqWhkoSEzvdWZphb990dUBg1cBLZztuODBqg32D49dMDsV0yjwSphEqtWaXvV1UFHU+r+6zEPVi6m4jXaFc7klkBHhZ6tTJahS0XKpElCZhw4M/ukFLkKNjs/bAnW3F7OMeaVR/O/IjXU5r6SkSqb3vme2A+puvl4tdZOq8hgLfbLggMfP5sZILxZ/BtsBzSa3kUCZiJRUVUSZ8/7nkfsJkZI6pzAGa5d2y/j6qGW2AipJBgvOY7WKIybAPCXNvwUYBPAmU1qVKN0OKCkZUA6qUG74Nk2EGD80wFCooOE3NE7uO05PkGU/33iVAQXzfWhS+L1+czGaZ88lGhUODoLs9jYWs35zudRRDnRTpKij5vB44C29b+EzWhIx7aOTIPMzd69EELCl8PTAFx3tHb9voOluF/KUVKUxPN5nbxDFoejmTWVAuZyP3pd/alpNEDqN50MpN9tM8Ft2Y3CUq8RelutVmZPZUklTp8+UQoCEkRKly1TxshbB0svEaHxOw0ZyFT1jUABu/F0Ddzdarp8uy/tCUBh1d8nYW04Xz5UoMBpfLNtuNhXgZRO2l4ISaZJF5DJ+rvcBqYsSo07ohZylQTefCyZN8hnis5FMKE2JePNs2fr7pT5KBFZ9NOnUh4EfrFACXtxsvxyU8GCJaN4GrhwS6wb2MSe2Cap4EN71vuwUUQWLEK+traqMEhOHqjT6OA3lQVSVVNXzOEtkNfBVJf3xxdiy6UGa08FKRjBMKkJeZ7/Fbj6LMhXDKqKGja5apjX4tkBBpFDJS05HzT0sluoE4qj1/jiw0Cy8uAlTUhGyvpUkUwJIVqjYEigAIiVRVZCk1Ox2l6NpIiBuf/i9w0REnZb3Pc1I4A8GbhQm+YgJnIeIrZkeqgQVVUAde90TDr6OUjGdD3+0VxTBcRRHjvaGHwfz6M6BlAiGSGWboKRC1jdMCknNfs+3p8a7mlP3qL2B6AzGS/iHHw4b6EexzTN/lsk2Vz1IHZrDfoNF1WGvw+Qdt9rf0tbevbJMJ8js4WnPknfQdJbIGJqOp6GUmwzakgpNvb2TAy+P8MQgsoO9xu3DDYlquyY4bYPI9nsra3dtGpVc9uV9tNlqPIqJ8I/Iw8PKyTe9XMOborfZ8nib4YmUoC51q+FmPtrRdL54mIKAbGGD1sqj8zSbJqUH1yU1yoaja+eRkKbYCzwit7j8Z34iD+cU09uJnPhMLgrFELHV+e1CeIsaVYJFfDGxUNIUfepzcnd1eePai/ud3RJNxpzGR91mcnOdGSIwpYu4bGFaMjwxyEWLfAAJ17R8e34TCUdXrfb6yyzHoZPJcnL8Lhpdp3bVCgpxudVU0kdBRE417+xn16mMbxfUQHKO0yBfOvHFVWYh82U6l0mS+zNQvtAvA5q3u9h0zOndXJKUDavM/lme9DxQOr86m5OFkExjTmFXtSlKF/klfZQIYFrtiNBkqTAWpOTCs3AYGBeO7pZgJjYqEayXr3sClLBFUPxYlaoCAClYk7uphbo009WASvOCSV9WN5evntb1JYEIvH7IpIkoEZgZK9WbdV29wdzW7End/RQZq44UG10bIr1vRDa902YSmee17QxynQg/dYV1GW82StOnp06gpLo9UOf0+dOjSg/a90enD3NeIclUt2V6MKXM4Ed+d0+qTy2+bptVVRJCw2IroKbtRxmMbs7M/AiqeApKUIKqinCzbbejUW8Y28gBz+XCzSzsOUfMB8D+cZe3A8q95jB2pYKMCry9TnNro/G9ZlpuR5kqrN1q9VR2K4xue5CLLb9vtyN3B1p7sdUeTklcPo80QI1Bs0UYu7yG9/bavqkt6OLyJpZcs17nYNBCTUFVBJ7m5/Eti2hdQeEPu2AmIlXhRgO1Nb3XX5f0m1qvnqD88lS5C/g70B1oXUB1p9HKQV9lI75WDQrg1ZSFSjX6iqAValRfjVOpyn34eLwzo1IxBd204LUioEX2a1dzwaueWEazV4mky6LL1BYzPbtR229VzxlfOC7mVQU1zxKdXSyrxpTZ1+/OVHlxIAgSfk0GrSqbYElm16OFFGxVC1b4YOhszqjwyhYA6lzh6V7RVoRVU5FKSxMQo/iFI7b4YQ1Xve5BTJWDEqDVX9BW3OPtTx31F+b7XSuyA92B7kB3oDvQHej/OSjeCqjuQCsGTd8Gp3By/RY4Rymn0VsAjWMOw9EbUGi4sLNWUn/QdDrhcBy/AcvfzeyY5/UHnY0ndmaW9QdNpjOezEZXdee8Gs0mRqjZsq1ac958/3w2Mw6+tup9L4Svf12NIkPqtGF7deb88vly7gxJRmRMt7ac3758vrhLyRA5UWdNUFPOs69/XdzG+Y+XpS4R9up564aLL3//cxvS6lfWEpU4CbV+qJdf/vP3xd2M1qCUZPFiyaib+c+/f/5ynnOuB7mzKM7mV9+anfZRXZQZzuPR9fRivLqJ2Ka3M0GjF/T294PgpA5LaDa7u5vMJvc3O9uMxt3cOieaxuH4V98+jiSNo+lsPJ2E2ZqT/gsjJktjrQkBagAAAABJRU5ErkJggg=='
                          "
                          alt=""
                        />
                      </div>
                      <div class="imgBox" v-else-if="item.dSid == 18">
                        <img
                          :src="
                            item.typeName == '正常'
                              ? '../../assets/shuijin_zhengchang.png'
                              : item.typeName != ''
                              ? '../../assets/shuijin_baojing.png'
                              : 'http://psy119.cn/lingdong1/static/img/shuijin_lixian.3b948255.png'
                          "
                          alt=""
                        />
                      </div>
                      <div class="imgBox" v-else-if="item.dSid == 19">
                        <img
                          :src="
                            item.typeName == '正常'
                              ? '../../assets/shuijin_zhengchang.png'
                              : item.typeName != ''
                              ? '../../assets/shuijin_baojing.png'
                              : 'http://psy119.cn/lingdong1/static/img/shuijin_lixian.3b948255.png'
                          "
                          alt=""
                        />
                      </div>
                      <div class="imgBox" v-else-if="item.dSid == 21">
                        <img
                          :src="
                            item.typeName == '正常'
                              ? 'http://psy119.cn/lingdong1/static/img/miehuoqi.0d409d2e.png'
                              : item.typeName != ''
                              ? 'http://psy119.cn/lingdong1/static/img/miehuoqi.0d409d2e.png'
                              : 'http://psy119.cn/lingdong1/static/img/miehuoqi.0d409d2e.png'
                          "
                          alt=""
                        />
                      </div>

                      <div class="imgBox" v-else-if="item.dSid == 20">
                        <img
                          :src="
                            item.typeName == '正常'
                              ? 'http://psy119.cn/lingdong1/static/img/nfc.80859648.jpg'
                              : item.typeName != ''
                              ? 'http://psy119.cn/lingdong1/static/img/nfc.80859648.jpg'
                              : 'http://psy119.cn/lingdong1/static/img/nfc.80859648.jpg'
                          "
                          alt=""
                        />
                      </div>
                      <div class="imgBox" v-else-if="item.dSid == 49">
                        <img
                          :src="
                            item.typeName == '正常'
                              ? 'http://psy119.cn/lingdong1/static/img/luxiangji.ab7ad4cb.png'
                              : item.typeName != ''
                              ? 'http://psy119.cn/lingdong1/static/img/luxiangji.ab7ad4cb.png'
                              : 'http://psy119.cn/lingdong1/static/img/luxiangji.ab7ad4cb.png'
                          "
                          alt=""
                        />
                      </div>
                      <div class="imgBox" v-else-if="item.dSid == 50">
                        <img src="../../assets/jxs.png" alt="" />
                      </div>
                      <!-- 电气,采集器的图标 -->
                      <div class="imgBox" v-else>
                        <img
                          :src="
                            item.typeName == '正常'
                              ? 'http://psy119.cn/lingdong1/static/img/%E7%94%A8%E7%94%B5%E9%87%8F@2x.2062f9b5.png'
                              : item.typeName != ''
                              ? 'http://psy119.cn/lingdong1/static/img/yongdianlian_baojing@2x.e8706321.png'
                              : 'http://psy119.cn/lingdong1/static/img/yongdianlian_lixian.b6674b46.png'
                          "
                          alt=""
                        />
                      </div>
                    </el-col>
                    <el-col :span="16">
                      <ul
                        v-if="
                          item.dSid == '48' ||
                          item.dSid == '49' ||
                          item.dSid == '9'
                        "
                      >
                        <li>设备编号:{{ item.devId }}</li>
                        <li>位置:{{ item.installLocation }}</li>
                        <li>
                          <el-button
                            type="primary"
                            size="mini"
                            @click.stop="seeVedio(item)"
                            >查看视频</el-button
                          >
                        </li>
                      </ul>

                      <ul v-else>
                        <li>设备编号:{{ item.productNumber }}</li>
                        <li>更新时间:{{ item.heartbeatTime }}</li>
                        <li>
                          报警类型:
                          <span
                            style="color: #f830af"
                            v-if="item.typeName != '正常'"
                          >
                            {{ item.typeName }}
                          </span>
                          <span style="color: #6dff64" v-else>
                            {{ item.typeName }}
                          </span>
                        </li>

                        <li>位置:{{ item.installLocation }}</li>
                      </ul>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </el-col>
            <el-col :span="16">
              <el-row :gutter="20" v-if="type != '5'">
                <el-col :span="8">
                  <div
                    @click="numType(0)"
                    :class="numTypeStatus == 0 ? 'num numClick' : 'num'"
                  >
                    <div class="num_item">
                      <p>{{ devMess[0] }}</p>
                      <p>报警设备</p>
                    </div>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div
                    @click="numType(1)"
                    :class="numTypeStatus == 1 ? 'num numClick' : 'num'"
                  >
                    <div class="num_item">
                      <p style="color: #30ff32">{{ devMess[1] }}</p>
                      <p>在线设备</p>
                    </div>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div
                    @click="numType(2)"
                    :class="numTypeStatus == 2 ? 'num numClick' : 'num'"
                  >
                    <div class="num_item">
                      <p style="color: #c0cbe9">{{ devMess[2] }}</p>
                      <p>离线设备</p>
                    </div>
                  </div>
                </el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :span="12">
                  <div class="info">
                    <p class="el-dialog__title">单位简介</p>
                    <div
                      class="four"
                      v-for="(item, index) in GetMapDataList.Company"
                      :key="index"
                    >
                      <p>
                        <span style="color: #28d9ff">{{ item.MC }}</span
                        >位于
                        <span style="color: #28d9ff">{{ item.areaMC }}</span
                        >详细位置
                        <span style="color: #28d9ff">{{ item.address }}</span>
                        <!-- 单位类型为
                        <span style="color: #28d9ff">其他</span> -->
                      </p>
                      <p>
                        单位消防安全负责人是<span style="color: #28d9ff">{{
                          item.firename
                        }}</span>
                        联系电话是
                        <span style="color: #28d9ff">{{ item.firephone }}</span>
                        消防安全管理人是
                        <span style="color: #28d9ff">{{ item.resname }}</span>
                        联系电话是
                        <span style="color: #28d9ff">{{ item.resphone }}</span>
                      </p>
                      <p>
                        该单位使用属于
                        <span style="color: #28d9ff">{{ item.typeMC }}</span>
                      </p>
                    </div>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="info" v-if="type != '5'">
                    <p class="el-dialog__title">一周内报警数</p>
                    <div id="echartsBox"></div>
                  </div>
                  <div class="info" v-else>
                    <p class="el-dialog__title">报警情况</p>
                    <div class="four">
                      <p>报警时间:无报警</p>
                      <p>报警设备:暂无</p>
                      <p>报警防区:暂无</p>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </el-dialog>
    </div>

    <Yangan ref="yangan" />
    <Dianli ref="dianli" />
    <Ranqi ref="ranqi" />
    <Shuiwei ref="shuiwei" />
    <Shipin ref="shipin" />
    <Jiance ref="jiance" />
    <Jxs ref="jxs" />
  </div>
</template>

<script lang="ts"  setup>
import Yangan from "./info/yangan.vue";
import Dianli from "./info/dianli.vue";
import Shuiwei from "./info/shuiwei.vue";
import Shipin from "./info/shipin.vue";
import Ranqi from "./info/ranqi.vue";
import Jiance from "./info/jiance.vue";
import Jxs from "./info/jxs.vue";
import * as echarts from "echarts";
import { getDeviceByPid, GetMapData } from "../../api/index";
import { ref, defineExpose, onMounted } from "vue";
import { ElMessageBox } from "element-plus";
import router from "../../router/index";
const loading = ref(true);
const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `;
const userName = sessionStorage.getItem("userName");

const numTypeStatus = ref(1);
const pidInfo = ref();
const title = ref();
const type = ref();
const getDeviceList = ref();
const yangan: any = ref(null);
const shipin: any = ref(null);
const dianli: any = ref(null);
const jiance: any = ref(null);
const ranqi: any = ref(null);
const jxs: any = ref(null);
const shuiwei: any = ref(null);
const devMess = ref([]);
const GetMapDataList = ref({});
const dialogVisible = ref(false);

onMounted(() => {
  type.value = sessionStorage.getItem("type");
  // console.log(type.value, "type");
});

const numType = (data: number) => {
  numTypeStatus.value = data;
  GetInfoFun(false);
};

const devicesInfo = (devId: any, dSid: number) => {
  console.log("进来了devicesInfo", devId, dSid);
  if (dSid == 2 || dSid == 45) {
    yangan.value.show(devId, 99);
  } else if (dSid == 3 || dSid == 22) {
    dianli.value.show(devId, 2);
  } else if (dSid == 6 || dSid == 11 || dSid == 1) {
    ranqi.value.show(devId, 7);
  } else if (dSid == 4 || dSid == 8) {
    shuiwei.value.show(devId, 3, dSid);
  } else if (dSid == 48 || dSid == 49 || dSid == 9) {
    shipin.value.show(devId, 3, dSid);
  } else if (dSid == 12) {
    jiance.value.show(devId, 12, dSid);
  } else if (dSid == 50) {
    jxs.value.show(devId, 50);
  }
};

const seeVedio = (item: any) => {
  console.log(item, 999);
  if (item.dSid == 48) {
    shipin.value.fireData(item);
  } else {
    shipin.value.show(item);
  }
};

const GetInfoFun = async (data: boolean) => {
  loading.value = true;

  const path = router.currentRoute.value.fullPath;
  // let type = path == "/platform" ? sessionStorage.getItem("type") : 99;
  await getDeviceByPid(
    pidInfo.value,
    numTypeStatus.value,
    type.value,
    userName
  ).then((result) => {
    getDeviceList.value = result.data.mess;
  });
  if (!data) return (loading.value = false);

  await GetMapData(pidInfo.value, type.value, userName).then((res) => {
    GetMapDataList.value = res.data;
    title.value = res.data.Company[0].MC;
    devMess.value = res.data.devMess;
    console.log(type.value, "type");

    if (type.value != "5") {
      type EChartsOption = echarts.EChartsOption;

      var chartDom = document.getElementById("echartsBox")!;
      console.log(chartDom, 789);

      var myChart = echarts.init(chartDom);
      var option: EChartsOption;
      let name: any = [];
      let data: any = [];
      // //console.log(res.data.Diagram, 333);
      res.data.Diagram.forEach((element: any) => {
        name.push(element.date);
        data.push(element.num);
      });
      option = {
        xAxis: {
          type: "category",
          data: name,
          axisLabel: {
            show: true,
            // textStyle: {
            color: "#fff",
            // },
          },
        },
        textStyle: {
          color: "#fff",
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        yAxis: {
          type: "value",
          axisLabel: {
            show: true,
            // textStyle: {
            color: "#fff",
            // },
          },
        },
        series: [
          {
            data: data,
            type: "line",
            smooth: true,
            itemStyle: {
              // normal: {
              // lineStyle: {
              color: "red",
              // },
              // },
            },
          },
        ],
      };

      myChart.setOption(option);
    }
  });
  loading.value = false;
};
const show = (pid: string) => {
  dialogVisible.value = true;
  pidInfo.value = pid;

  GetInfoFun(true);
};
defineExpose({
  show,
  devicesInfo,
});
</script>
<style scoped lang="less">
.dialog-footer button:first-child {
  margin-right: 10px;
}
#popup {
  .info {
    /deep/.el-dialog {
      width: 1250px;
      height: 497px;
      background: linear-gradient(0deg, rgba(39, 65, 132), rgba(2, 17, 50));
      border: 1px solid #3486da;
      border-radius: 6px;

      .el-dialog__headerbtn .el-dialog__close {
        color: #fff;
      }
      .el-dialog__title {
        width: 255px;
        height: 30px;
        background: linear-gradient(90deg, #3053af, #14295a);
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #ffffff;
        display: inline-block;
        line-height: 30px;
        padding-left: 20px;
      }

      .el-dialog__body {
        .scroll {
          overflow-y: auto;
          height: 380px;
          overflow-x: hidden;
          .box {
            // width: 370px;
            // height: 130px;
            background: linear-gradient(-87deg, #3053af, #14295a);
            border: 1px solid #3486da;
            margin-bottom: 10px;
            // /deep/.el-row {
            // height: 100%;
            // }
            .imgBox {
              position: relative;
              width: 100%;
              height: 100%;
              // text-align: center;
              // line-height: 130px;
              img {
                width: 84px;
                height: 84px;
                // vertical-align: middle;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translateY(-50%);
                // transform: translateX(-50%);
                margin-left: -42px;
              }
            }
            ul {
              li {
                margin-top: 11px;
                color: #fff;
                &:last-child {
                  margin-bottom: 10px;
                }
              }
            }
          }
        }

        .num {
          height: 75px;
          cursor: pointer;
          position: relative;
          background: rgba(0, 0, 0, 0.2);
          border: 0.005208rem solid rgba(54, 238, 248, 0.2);
          text-align: center;

          p {
            &:first-child {
              color: #f9387f;
              font-size: 22px;
              margin-top: 10px;
            }
            &:last-child {
              color: #c0cbe9;
              font-size: 14px;
              // margin-top: 5px;
            }
          }
          &::before {
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            border-left: 1px solid #00c0ff;
            border-top: 1px solid #00c0ff;
            width: 5px;
            height: 5px;
          }
          &::after {
            content: "";
            position: absolute;
            right: 0;
            top: 0;
            border-right: 1px solid #00c0ff;
            border-top: 1px solid #00c0ff;
            width: 5px;
            height: 5px;
          }
          .num_item {
            &::before {
              content: "";
              position: absolute;
              left: 0;
              bottom: 0;
              border-left: 1px solid #00c0ff;
              border-bottom: 1px solid #00c0ff;
              width: 5px;
              height: 5px;
            }
            &::after {
              content: "";
              position: absolute;
              right: 0;
              bottom: 0;
              border-right: 1px solid #00c0ff;
              border-bottom: 1px solid #00c0ff;
              width: 5px;
              height: 5px;
            }
          }
        }
        .numClick {
          background: rgba(48, 255, 243, 0.3);
          border: 1px solid rgba(48, 255, 243, 0.1);
        }
        .info {
          margin-top: 10px;
          height: 290px;

          border: 1px solid #3486da;
          .four {
            padding: 20px;
            p {
              color: #fff;
              text-indent: 2em;
            }
          }
          #echartsBox {
            height: 260px;
            // background: #00c0ff;
          }
        }
      }
    }
  }
}
</style>
