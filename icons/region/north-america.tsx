import React from 'react';

const NorthAmerica: React.FC<LogoProps> = (props) => {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M24.5744 43.6631C24.2109 44.0497 24.7042 44.1016 25.0013 44.0237C25.3504 43.9718 25.6879 43.816 26.011 43.9458C26.1531 44.0301 26.3053 44.096 26.4639 44.142C26.6341 44.191 26.8533 44.142 27.0409 44.217C27.3293 44.3612 27.5053 44.7218 27.7649 44.918C28.0409 45.147 28.3778 45.2904 28.7342 45.3305C29.0861 45.3305 29.5246 45.0593 29.164 44.7363C29.0342 44.6064 28.8005 44.5805 28.6332 44.4911C28.4461 44.4065 28.2715 44.2968 28.114 44.1651C27.9207 44.0237 27.7245 43.8939 27.5197 43.7641C27.3299 43.6425 27.1254 43.5456 26.911 43.4756C26.8228 43.4389 26.7322 43.408 26.6399 43.3833C26.5932 43.3681 26.5447 43.3594 26.4956 43.3574C26.4956 43.3574 26.4697 43.3574 26.4437 43.3314C26.4268 43.3365 26.4087 43.3365 26.3918 43.3314C26.3658 43.3314 26.3399 43.3314 26.3139 43.3054L26.135 43.265H25.636C25.5581 43.265 25.4946 43.265 25.4283 43.291C25.3923 43.3108 25.3533 43.3244 25.3129 43.3314C25.2823 43.3264 25.2512 43.3264 25.2206 43.3314C25.1946 43.3458 25.1687 43.3458 25.1427 43.3574C25.1032 43.3608 25.0644 43.3695 25.0273 43.3833C24.9738 43.3954 24.9216 43.4128 24.8715 43.4352C24.7694 43.4762 24.6771 43.5381 24.6004 43.617C24.6004 43.6314 24.5744 43.6429 24.5744 43.6574V43.6631ZM27.5399 51.7C27.5431 51.7566 27.5246 51.8124 27.488 51.8558C27.3491 51.9951 27.2349 52.157 27.1505 52.3346C27.1218 52.4272 27.0871 52.5178 27.0466 52.6058C26.8908 52.2827 26.6976 51.726 26.2447 51.7779C26.0629 51.8038 25.9216 51.9971 25.7918 52.101C25.6995 52.1775 25.5911 52.2323 25.4748 52.2612C25.3584 52.2902 25.237 52.2926 25.1196 52.2683C24.86 52.1673 24.7677 51.9798 24.6004 51.7894C24.4339 51.6346 24.2285 51.5279 24.0061 51.4808C23.9217 51.4582 23.8433 51.4176 23.776 51.3618C23.7088 51.3061 23.6545 51.2364 23.6167 51.1577C23.518 51.013 23.4312 50.8606 23.3571 50.7019C23.2417 50.3413 23.3571 50.0297 23.0859 49.7182C22.8926 49.4874 22.633 49.3576 22.4253 49.1412C22.0243 48.7403 21.4935 48.896 21.0031 48.6624C20.7683 48.5107 20.5549 48.3283 20.3685 48.12C20.1463 47.8979 19.9675 47.6268 19.7338 47.4191C19.4844 47.2363 19.1759 47.153 18.8684 47.1854C18.453 47.1854 18.052 47.2777 17.6366 47.2633C17.1203 47.2633 16.8231 46.9287 16.4337 46.6315C16.249 46.4857 16.0499 46.3591 15.8394 46.2536C15.6317 46.1382 15.3865 46.0604 15.1788 45.945C14.9964 45.8571 14.8341 45.7322 14.7025 45.5783C14.5709 45.4243 14.4728 45.2446 14.4144 45.0507C14.3308 44.7654 14.3043 44.4664 14.3365 44.1709C14.4092 43.8747 14.3723 43.5621 14.2327 43.291C14.0635 43.0032 13.8705 42.7301 13.6557 42.4746C13.493 42.2642 13.35 42.0392 13.2288 41.8025C13.1013 41.5867 12.9493 41.3863 12.7759 41.2053C12.5653 40.9364 12.3916 40.6405 12.2595 40.3255C12.084 39.946 11.9411 39.5523 11.8326 39.1485C11.7698 38.8456 11.6134 38.5701 11.3854 38.361C10.996 38.0898 10.9441 39.2005 11.0479 39.4341C11.1518 39.6678 11.2931 39.939 11.397 40.2245C11.4872 40.4885 11.5434 40.7628 11.5643 41.0409C11.5643 41.2198 11.5643 41.4015 11.6047 41.5833C11.6487 41.7552 11.7046 41.9239 11.772 42.0881C11.8187 42.2613 11.8448 42.4395 11.8499 42.6189C11.8912 42.7799 11.9 42.9476 11.8758 43.1122C11.7604 43.4006 11.371 42.6189 11.345 42.4891C11.2891 42.1892 11.207 41.8948 11.0998 41.6092C10.8662 41.0525 10.1681 40.7928 10.2979 40.0947C10.4018 39.8613 10.4634 39.6112 10.4796 39.3562C10.4796 39.0678 10.2575 38.8254 10.2315 38.5427C10.2315 38.3466 10.2575 38.1533 10.2575 37.9658C10.2562 37.7793 10.221 37.5945 10.1536 37.4206C10.0096 37.0848 9.79401 36.7845 9.52189 36.5407C9.20833 36.2673 8.96748 35.9204 8.8209 35.5311C8.76587 35.3155 8.7483 35.092 8.76898 34.8705C8.8018 34.7384 8.84521 34.6091 8.89879 34.4839C8.93918 34.3282 8.92475 34.3282 8.83533 34.2358C8.7459 34.1435 8.75744 34.1205 8.76898 33.9791C8.78052 33.8378 8.80936 33.7454 8.83533 33.6272C8.85331 33.4993 8.8975 33.3766 8.96514 33.2666C9.05457 33.1743 9.19592 33.1627 9.29977 33.0848C9.77863 32.7964 9.6892 32.2569 9.93441 31.8156C10.1405 31.5072 10.3837 31.2252 10.6585 30.9761C10.8496 30.7973 11.027 30.6045 11.1893 30.3992C11.3245 30.1888 11.4222 29.9564 11.4777 29.7126C11.5265 29.5543 11.6284 29.4178 11.7662 29.326C11.9999 29.1558 12.2451 29.1183 12.3633 28.8068C12.4201 28.6838 12.4356 28.5457 12.4075 28.4131C12.3794 28.2806 12.3093 28.1606 12.2076 28.0712C12.0341 27.8714 11.8823 27.6538 11.7547 27.4221C11.6222 27.1002 11.613 26.7408 11.7287 26.4125C11.7922 26.2048 11.896 26.0115 11.9479 25.8038C11.9766 25.6129 11.9853 25.4195 11.9739 25.2268C11.9739 25.0076 11.9739 24.7884 11.9739 24.5662C11.9914 24.4085 11.9612 24.2491 11.8871 24.1087C11.8131 23.9683 11.6986 23.8533 11.5585 23.7787C11.4062 23.6743 11.2668 23.5523 11.1431 23.4152C10.9643 23.196 10.9902 22.8844 10.7046 22.7431C10.3556 22.5729 9.94018 22.6248 9.5767 22.5354C9.21322 22.446 8.86706 22.2902 8.49204 22.2238C8.37493 22.1856 8.25101 22.1728 8.12857 22.1863C7.96125 22.2123 7.90933 22.3536 7.81702 22.4748C7.55739 22.8383 7.20834 22.7633 6.82179 22.7979C6.62739 22.7946 6.43342 22.8169 6.24484 22.8642C6.0631 22.9017 5.88136 23.0056 5.69962 23.0316C5.46885 23.0691 5.53231 22.9277 5.37654 22.8383C5.22076 22.7489 4.86017 22.9017 4.70439 22.9941C4.18356 23.2351 3.64189 23.4282 3.08606 23.571C2.42546 23.7902 1.77928 24.0124 1.13022 24.2316C0.925399 24.3095 0.729238 24.3874 0.521537 24.4508C0.394609 24.4768 0.134985 24.6441 0.0426733 24.5287C-0.0986784 24.373 0.146523 24.0874 0.264796 24.0124C0.554452 23.865 0.871972 23.7804 1.19656 23.7643C1.48504 23.7268 1.98698 23.6489 2.06198 23.2854C2.10237 23.0921 1.84274 22.9969 1.68697 22.9623C1.35234 22.9104 1.30041 22.8066 1.26003 22.4719C1.23459 22.3455 1.24862 22.2143 1.30022 22.0962C1.35182 21.978 1.43849 21.8786 1.5485 21.8113C1.72216 21.7076 1.9096 21.629 2.10525 21.5777C2.37739 21.4579 2.65918 21.3614 2.9476 21.2892C3.27068 21.1998 3.6082 21.1478 3.93129 21.044C4.0986 20.9805 4.25438 20.9026 4.42457 20.8507C4.59477 20.7988 4.79959 20.7844 4.98133 20.7209C5.16307 20.6574 5.89867 20.3978 5.40827 20.268C4.91786 20.1382 4.56593 20.4872 4.12456 20.2536C4.0596 20.2225 4.00663 20.1709 3.9738 20.1068C3.94097 20.0427 3.93009 19.9696 3.94283 19.8987C3.96879 19.7805 4.01783 19.5612 4.1361 19.5237C4.27994 19.5215 4.42346 19.538 4.56304 19.5728C4.74071 19.6154 4.92266 19.6377 5.10537 19.6391C5.39384 19.6391 5.65059 19.6391 5.92175 19.6391C6.08906 19.6247 6.60831 19.7805 6.60831 19.5353C6.60831 19.2468 6.18138 19.0939 6.16695 18.7968C6.16695 18.0842 6.9314 18.2804 7.32084 18.2804C7.8776 18.2804 8.5007 18.0092 9.05168 17.839C9.58887 17.652 10.1531 17.5546 10.7219 17.5506C11.0187 17.5708 11.3165 17.5708 11.6133 17.5506C12.1585 17.5015 12.7153 17.4871 13.2576 17.4236C13.6087 17.3868 13.9635 17.4083 14.3077 17.4871C14.5529 17.5131 14.8125 17.565 15.0577 17.6025C15.4587 17.6544 15.8596 17.6025 16.2606 17.6804C16.4911 17.7477 16.7007 17.8729 16.8693 18.0439C17.0649 18.168 17.2875 18.2432 17.5184 18.2631C18.1645 18.3669 18.7213 18.0698 19.3155 17.9285C19.705 17.8362 20.08 17.8102 20.4694 17.7467C20.6108 17.7208 21.1791 17.6025 21.3089 17.6948C21.5166 17.8621 21.1675 18.0958 21.5685 18.1333C21.8606 18.1212 22.1507 18.0786 22.4339 18.0064C22.6254 17.9683 22.8231 17.9762 23.0109 18.0294C23.2676 18.1217 23.4234 18.2891 23.7205 18.3179C24.11 18.3698 24.459 18.3179 24.8485 18.3958C25.4427 18.5371 24.6783 18.6843 24.7042 18.915C24.7186 18.9929 25.6129 18.967 25.6879 18.967C25.936 18.967 26.1552 18.941 26.3889 18.941C26.9312 18.941 27.3207 18.4881 27.8313 18.4362C27.9607 18.4246 28.0911 18.4333 28.2178 18.4621C28.4442 18.464 28.6701 18.4852 28.8928 18.5256C29.0602 18.5775 29.1265 18.7333 29.2938 18.7708C29.534 18.7923 29.7755 18.7474 29.9919 18.641C30.1996 18.5775 30.4073 18.641 30.615 18.5891C30.8227 18.5371 30.9756 18.3006 31.1574 18.2141C31.2538 18.1571 31.3611 18.1208 31.4723 18.1074C31.5835 18.094 31.6963 18.1038 31.8035 18.1362C32.0632 18.2285 31.9853 18.3583 31.9997 18.5775C31.9997 18.9006 32.3084 18.7968 32.5305 18.6814C32.6718 18.615 33.1882 18.2919 33.1882 18.1246C33.1882 17.9573 32.969 17.9169 32.9315 17.7756C32.894 17.6342 32.9949 17.5275 33.0988 17.4265C33.2459 17.2714 33.4162 17.1401 33.6036 17.0371C33.8113 16.9332 34.3536 16.8813 34.3017 17.2448C34.2758 17.4265 33.8748 17.6977 34.0305 17.9169C34.2238 18.1881 34.795 17.9169 35.0402 18.0467C35.571 18.3583 34.2902 18.7448 34.6652 19.0679C34.9248 19.2901 35.2854 18.915 35.3777 18.7073C35.4862 18.4576 35.6607 18.2422 35.8825 18.0842C36.0223 17.9755 36.1822 17.8955 36.353 17.8489C36.5238 17.8024 36.7022 17.7902 36.8778 17.8131C37.6163 17.9169 37.0855 18.5775 36.748 18.8372C36.5803 18.9609 36.4204 19.0948 36.2691 19.2381C36.1822 19.3738 36.0796 19.4988 35.9633 19.6103C35.7152 19.818 35.4181 19.6997 35.121 19.6997C34.694 19.6997 34.2007 19.7141 33.8921 20.0372C33.6391 20.3083 33.323 20.5124 32.9719 20.6315C32.6834 20.7497 32.3632 20.7757 32.1064 20.8911C31.8829 21.0259 31.6671 21.1732 31.4603 21.3325C31.1808 21.5086 30.875 21.6391 30.5544 21.719C30.0092 21.8229 29.5967 22.2238 29.1698 22.5844C28.9172 22.7341 28.6862 22.9176 28.4832 23.1296C28.2236 23.4672 28.4688 23.4181 28.74 23.5566C29.1929 23.7758 28.4948 24.4768 29.0515 24.5778C29.4265 24.6297 29.7756 24.3326 30.1131 24.6182C30.2948 24.7595 30.3467 25.0191 30.54 25.1345C30.8336 25.3013 31.1609 25.3999 31.4978 25.423C31.6535 25.4374 31.9651 25.3855 32.0545 25.5153C32.2103 25.7345 31.9247 26.0201 31.7949 26.1471C31.7201 26.2144 31.6642 26.3002 31.6329 26.3959C31.6015 26.4915 31.5957 26.5937 31.616 26.6923C31.642 26.848 31.616 27.1452 31.7574 27.249C31.9766 27.4163 32.3661 27.2231 32.5593 27.1308C32.8478 27.0154 32.8478 26.7442 32.9603 26.4586C33.0197 26.2271 33.1357 26.014 33.2978 25.8384C33.4257 25.6967 33.5734 25.5743 33.7363 25.4749C33.9844 25.3191 34.2671 25.2413 34.5152 25.0739C34.7952 24.8608 35.055 24.6223 35.2912 24.3614C35.4729 24.1797 35.7181 24.0124 35.6143 23.7412C35.5508 23.5479 35.4066 23.4527 35.395 23.2219C35.3691 22.6652 36.0672 22.5642 36.2604 22.1604C36.3643 21.9411 36.3643 21.7738 36.6239 21.6815C36.9356 21.5854 37.272 21.609 37.5672 21.7479C37.7749 21.8777 37.9942 21.8113 38.2538 21.8777C38.4867 21.9417 38.7091 22.0389 38.9144 22.1661C39.4308 22.4921 38.5769 23.0085 38.7961 23.4614C39.1077 24.1076 39.8317 23.1902 40.2385 23.1123C40.4899 23.0532 40.7515 23.0532 41.0029 23.1123C41.2626 23.1902 41.1991 23.4873 41.1991 23.7325C41.2121 23.8447 41.2121 23.9579 41.1991 24.0701C41.1991 24.1739 41.1068 24.2518 41.1068 24.3585C41.1407 24.5919 41.22 24.8164 41.3405 25.0191C41.5741 25.472 42.1309 25.5643 42.3357 26.0028C42.4799 26.3259 42.428 26.9231 42.1164 27.1279C41.9232 27.2577 41.6635 27.1279 41.4558 27.1683C41.1472 27.2058 40.9914 27.4279 40.7837 27.6327C40.6404 27.7584 40.4703 27.8498 40.2863 27.8998C40.1023 27.9498 39.9094 27.9571 39.7221 27.9212C39.4297 27.914 39.1373 27.9324 38.848 27.976C38.4211 28.0164 38.0201 27.8087 37.5932 27.8346C37.1662 27.8606 36.9326 28.1577 36.6355 28.4116C36.4653 28.5558 36.246 28.6049 36.1941 28.8529C36.1162 29.228 36.5056 29.1241 36.7364 29.0722C37.0093 29.0117 37.2911 29.0029 37.5672 29.0462C37.8384 29.0981 37.824 29.3058 37.7201 29.4991C37.5153 29.8482 37.5932 29.8482 37.8124 30.1453C37.9466 30.3257 38.0392 30.5336 38.0836 30.754C38.098 31.1434 37.6826 31.1953 37.4114 31.3107C37.1403 31.4261 36.4537 32.1761 36.2201 31.6857C36.189 31.6044 36.1753 31.5175 36.1798 31.4306C36.1843 31.3437 36.2068 31.2586 36.246 31.1809C36.3354 31.0396 36.5576 30.9761 36.5951 30.8203C36.0008 30.379 35.4181 31.3973 35.0171 31.6857C34.7287 31.8675 34.4719 31.8271 34.2527 32.1127C34.1488 32.254 34.0854 32.4012 33.993 32.5396C33.839 32.723 33.6604 32.8841 33.4623 33.0185C33.1017 33.307 32.5824 33.2377 32.1555 33.33C32.0158 33.3643 31.8882 33.4363 31.7865 33.538C31.6847 33.6397 31.6128 33.7673 31.5785 33.907C31.4227 34.2271 31.229 34.5273 31.0016 34.8013C30.9756 34.8388 30.9381 34.9311 30.8977 34.9426C30.8573 34.9541 30.8458 34.8907 30.7823 34.8907C30.6525 34.8907 30.667 34.8272 30.5631 34.9311C30.3814 35.1243 30.4968 35.508 30.4073 35.733C30.2891 36.0821 29.8765 36.2379 29.7063 36.5984C29.5796 36.8735 29.3541 37.0907 29.0746 37.2071C28.862 37.3574 28.6415 37.4961 28.414 37.6225C28.2172 37.6872 28.0329 37.7847 27.8688 37.911C27.6318 38.0982 27.4355 38.3319 27.2918 38.5976C27.1459 38.8673 27.0742 39.1709 27.0841 39.4774C27.1231 39.8562 27.1231 40.238 27.0841 40.6169C27.0582 40.9053 27.136 41.1938 27.0062 41.4563C26.9139 41.6381 26.6428 42.0131 26.4091 41.9871C26.0225 41.9496 26.1206 41.5227 26.086 41.2486C26.0666 41.1535 26.0541 41.0571 26.0485 40.9601C26.0644 40.7982 26.0943 40.638 26.1379 40.4813C26.1754 40.2736 26.1379 39.2755 25.7889 39.5236C25.72 39.5955 25.6331 39.6476 25.5372 39.6745C25.4413 39.7014 25.3399 39.7021 25.2437 39.6764C25.1058 39.6349 24.9781 39.5652 24.8686 39.4716C24.7385 39.3857 24.5938 39.3242 24.4417 39.2899C24.237 39.2242 24.0216 39.1978 23.8071 39.212C23.7005 39.2067 23.5943 39.2286 23.4984 39.2755C23.4465 39.3274 23.4724 39.4312 23.4465 39.5091C23.2503 39.9245 22.6936 39.7168 22.3849 39.6014C22.1886 39.5291 21.98 39.4965 21.771 39.5054C21.562 39.5143 21.3569 39.5646 21.1675 39.6534C20.9598 39.7428 21.0118 39.9418 20.7925 40.0024C20.5112 40.0648 20.2346 40.1468 19.9646 40.2476C19.5492 40.4149 18.9665 40.663 18.955 41.1679C18.9434 41.6727 18.528 42.1112 18.3578 42.59C18.2611 42.8677 18.2218 43.1621 18.2424 43.4554C18.2424 43.7439 18.1645 43.9862 18.1645 44.2574C18.1522 44.377 18.184 44.4971 18.254 44.5949C18.3262 44.6997 18.3754 44.8187 18.3982 44.944C18.5136 45.4863 18.7213 46.0315 19.3819 46.0055C19.7425 45.9796 20.0944 45.8757 20.455 45.8757C20.7435 45.8757 21.0781 45.8757 21.205 45.5872C21.2974 45.368 21.205 45.1084 21.3493 44.9151C21.4936 44.7377 21.6874 44.6072 21.906 44.5401C22.1593 44.3907 22.4522 44.3222 22.7455 44.3439C22.9791 44.3843 23.2128 44.5401 23.109 44.8228C23.057 44.9786 22.9157 45.0824 22.8493 45.2497C22.783 45.4171 22.7715 45.5613 22.7195 45.7171C22.6728 45.8442 22.6129 45.966 22.5407 46.0805C22.4484 46.2075 22.307 46.2738 22.2147 46.4036C22.0626 46.5976 21.9686 46.8306 21.9435 47.0758C21.9435 47.4133 22.1512 47.4508 22.4484 47.5171C22.5487 47.5501 22.6546 47.5629 22.7599 47.5546C22.8638 47.5546 22.9416 47.4508 23.0484 47.4133C23.5013 47.2431 24.0955 47.3354 24.3292 47.7883C24.5888 48.3047 24.159 48.8758 24.0955 49.3922C24.0184 49.7232 24.0056 50.066 24.058 50.4019C24.1215 50.6615 24.3811 50.8548 24.5369 51.0625C24.6236 51.1852 24.7407 51.2833 24.8768 51.347C25.0128 51.4107 25.1631 51.4379 25.3129 51.4259C25.5059 51.3942 25.6904 51.3235 25.8552 51.2182C25.9877 51.1669 26.1285 51.1405 26.2706 51.1404C26.4758 51.1093 26.6856 51.1322 26.8793 51.2067C27.0726 51.2557 27.1245 51.3596 27.1678 51.5298C27.211 51.7 27.2457 51.7606 27.413 51.7606C27.4472 51.7679 27.4826 51.7679 27.5168 51.7606C27.5313 51.7462 27.5428 51.7461 27.5572 51.7346L27.5399 51.7ZM46.3483 13.8899C46.0916 13.9043 45.8435 13.9158 45.5983 13.9418C45.3318 13.9553 45.0672 13.9939 44.8079 14.0572C44.5887 14.1351 44.254 14.3687 44.4992 14.6341C44.7444 14.8995 45.1079 14.8533 45.3646 14.9832C45.6198 15.0886 45.8909 15.1501 46.1666 15.1649C46.6455 15.1909 47.2022 15.0986 47.6695 15.2947C47.8017 15.3517 47.9106 15.4517 47.9787 15.5784C48.0468 15.7052 48.07 15.8512 48.0446 15.9928C48.0186 16.2524 47.8109 16.5351 47.8369 16.8092C47.8628 17.0832 48.2898 17.0284 48.4975 17.0804C48.7052 17.1323 49.21 17.5592 48.8206 17.6112C48.6532 17.6487 48.4571 17.5448 48.3013 17.6112C48.0301 17.7294 48.3417 18.1304 48.2119 18.3237C48.1343 18.4044 48.0335 18.4589 47.9234 18.4794C47.7748 18.517 47.6348 18.5826 47.5109 18.6727C47.3619 18.7739 47.2386 18.9084 47.151 19.0657C47.0633 19.223 47.0137 19.3986 47.0061 19.5785C47.0253 19.7496 47.06 19.9186 47.1099 20.0834C47.1359 20.3718 47.1359 20.6603 47.1618 20.9661C47.1898 21.1029 47.2415 21.2337 47.3147 21.3526C47.3811 21.4825 47.4445 21.5978 47.4965 21.7277C47.5484 21.8575 47.5743 22.0508 47.7186 22.1027C47.9074 22.1477 48.1023 22.1614 48.2955 22.1431C48.6298 22.1741 48.9443 22.3151 49.1898 22.544C49.5648 22.8152 49.9398 22.4921 50.1735 22.1806C50.4072 21.869 50.4447 21.5084 50.7187 21.2748C50.8966 21.1444 51.0575 20.9923 51.1976 20.8219C51.3384 20.6331 51.4936 20.4557 51.662 20.2911C51.864 20.1141 52.0801 19.9539 52.3082 19.8122C52.481 19.7426 52.668 19.7159 52.8534 19.7343C52.9169 19.7343 52.9832 19.7603 53.0467 19.7603C53.1787 19.7469 53.3091 19.7208 53.4361 19.6824C53.7391 19.6356 54.0374 19.5622 54.3275 19.4631C54.4656 19.4169 54.5966 19.3519 54.7169 19.2699C54.8074 19.1852 54.9038 19.1071 55.0054 19.0362C55.078 18.9656 55.1561 18.901 55.2391 18.8429C55.3201 18.7973 55.394 18.74 55.4583 18.6727C55.5337 18.6194 55.6265 18.5967 55.7179 18.6093C55.9033 18.6222 56.0893 18.6222 56.2747 18.6093C56.5006 18.5545 56.7215 18.4812 56.9353 18.39C57.1286 18.3121 57.3219 18.2602 57.5122 18.1968C57.5918 18.1643 57.6738 18.1382 57.7574 18.1189C57.8613 18.1044 57.9392 18.1044 58.0459 18.0929C58.2292 18.059 58.3992 17.974 58.5363 17.8477C58.5586 17.8346 58.5767 17.8155 58.5884 17.7925C58.6002 17.7695 58.6051 17.7436 58.6027 17.7179C58.5882 17.6515 58.5363 17.64 58.5104 17.5996C58.4844 17.5592 58.4844 17.4958 58.4469 17.4583C58.4094 17.4208 58.343 17.4208 58.3055 17.3544C58.2017 17.1467 58.5104 17.1611 58.6286 17.2246C58.6978 17.2604 58.7626 17.304 58.8219 17.3544C58.8893 17.4038 58.9722 17.4273 59.0556 17.4208C59.136 17.424 59.2153 17.4001 59.2806 17.3531C59.346 17.306 59.3937 17.2385 59.4162 17.1611C59.4421 16.9679 59.171 16.8496 59.0411 16.7861C58.9113 16.7227 58.6142 16.538 58.6661 16.3967C58.7181 16.2553 59.171 16.1774 59.3008 16.1515C59.4306 16.1255 59.5719 16.0736 59.7277 16.0476C59.8502 16.0414 59.9719 16.024 60.0912 15.9957C60.2971 15.9316 60.4777 15.8045 60.6076 15.6322C60.6953 15.5641 60.7705 15.4811 60.8297 15.387C60.8486 15.2976 60.8486 15.2053 60.8297 15.1159C60.8401 15.0328 60.8574 14.9508 60.8816 14.8707C60.9451 14.7264 61.0893 14.6226 61.1268 14.4553C61.1341 14.4036 61.1341 14.3512 61.1268 14.2995C61.1573 14.2116 61.2011 14.1289 61.2566 14.0543C61.4369 13.8292 61.6798 13.6626 61.9547 13.5754C62.0845 13.5235 62.2144 13.4456 62.3442 13.3937C62.4589 13.3691 62.5759 13.3565 62.6932 13.3562C63.0046 13.2983 63.3028 13.1839 63.5731 13.0187C63.6769 12.9667 64 12.8629 64 12.7302C64 12.5369 63.5875 12.5888 63.4692 12.5888C63.1068 12.61 62.7434 12.6051 62.3817 12.5744C62.073 12.5369 61.7499 12.6408 61.4239 12.5888C61.2191 12.5485 61.0749 12.3436 60.8816 12.2513C60.5512 12.1458 60.2024 12.1105 59.8575 12.1475C59.4565 12.1475 59.0815 12.0696 58.6806 12.0436C58.3548 11.9961 58.0246 11.9874 57.6969 12.0177C57.4776 12.058 57.2699 12.1879 57.0507 12.2398C56.7724 12.2856 56.4896 12.2982 56.2083 12.2773C55.8593 12.2773 55.5362 12.2773 55.1872 12.2917C55.0395 12.2964 54.8921 12.3089 54.7458 12.3292C54.5785 12.3696 54.4227 12.4475 54.2554 12.4965C53.9695 12.544 53.679 12.5576 53.39 12.5369C53.1015 12.5369 52.813 12.5629 52.5245 12.5629C52.2361 12.5629 51.9938 12.5888 51.7226 12.5888C51.4514 12.5888 51.2178 12.5888 50.9726 12.5888C50.6528 12.5751 50.3325 12.5877 50.0148 12.6263C49.7624 12.6655 49.5149 12.7312 49.2763 12.8225C48.7971 12.9255 48.3322 13.0863 47.8917 13.3014C47.7836 13.3811 47.6709 13.4543 47.5542 13.5206C47.4245 13.5811 47.2845 13.6163 47.1416 13.6245C46.9923 13.6417 46.8446 13.6717 46.7003 13.7139C46.5701 13.7856 46.4301 13.8381 46.2849 13.8697L46.3483 13.8899ZM58.6344 19.4949C58.4123 19.4689 58.1296 19.6882 57.9334 19.766C57.5988 19.9362 57.6449 20.167 58.0373 20.193C58.2075 20.2074 58.594 20.0776 58.594 20.3488C58.6084 20.5565 58.1671 20.8276 58.5421 20.9574C58.6745 20.9834 58.8107 20.9834 58.9431 20.9574C59.0847 20.9401 59.2284 20.9621 59.3585 21.0209C59.8258 21.2142 60.1085 20.9949 60.5124 20.7613C60.7309 20.6531 60.9613 20.5709 61.1989 20.5161C61.3807 20.4642 61.5624 20.5161 61.7297 20.4007C62.0528 20.2045 61.8855 19.8439 61.5999 19.6882C61.2508 19.4805 60.8124 19.7257 60.446 19.792C60.2039 19.7987 59.9618 19.7852 59.7219 19.7516C59.5337 19.8014 59.337 19.8103 59.145 19.7776C58.9633 19.7141 58.8565 19.5439 58.6402 19.5064L58.6344 19.4949ZM26.1033 29.5395C26.4801 29.4711 26.8485 29.3628 27.2024 29.2164C27.4471 29.0643 27.7137 28.9505 27.9928 28.8789C28.1118 28.851 28.2353 28.8482 28.3555 28.8705C28.4757 28.8929 28.5899 28.9399 28.6909 29.0087C28.7654 29.1108 28.8474 29.2072 28.9361 29.2972C29.0804 29.401 29.0544 29.4789 29.04 29.6318C29.0364 29.7308 29.0541 29.8294 29.092 29.921C29.1298 30.0126 29.1868 30.095 29.2592 30.1626C29.389 30.2809 29.5967 30.229 29.7525 30.2665C29.8652 30.3103 29.9704 30.3717 30.064 30.4482C30.1527 30.5039 30.2503 30.5439 30.3525 30.5665C30.6266 30.7078 30.4044 31.1434 30.1592 31.1867C29.9775 31.2242 29.9515 30.9934 29.7842 31.0194C29.6169 31.0453 29.565 31.2501 29.5131 31.38C29.4306 31.5743 29.3165 31.7536 29.1755 31.9108C29.0717 32.0146 28.838 32.156 28.8871 32.3261C29.0501 32.333 29.2116 32.2919 29.3515 32.2079C29.4782 32.1527 29.6143 32.1223 29.7525 32.1184C29.8563 32.1184 30.116 32.081 30.1044 32.2223C30.1044 32.3117 29.8823 32.4415 29.8304 32.4935C29.7116 32.6269 29.5526 32.7181 29.3775 32.7531C29.2169 32.7456 29.056 32.7582 28.8986 32.7906C28.6909 32.8685 28.4342 33.0127 28.2005 32.9089C28.0188 32.831 28.137 32.6752 28.2265 32.5454C28.2986 32.4487 28.3596 32.3442 28.4082 32.2338C28.4861 32.0665 28.6794 31.9886 28.7688 31.8213C28.939 31.4838 28.7428 31.4059 28.4457 31.3425C27.9668 31.2386 28.8352 30.6934 28.4601 30.6155C28.0851 30.5376 27.7851 31.0569 27.5659 31.2502C27.4135 31.3806 27.3014 31.5517 27.2428 31.7434C27.175 31.8911 27.0969 32.0337 27.0091 32.1704C26.9785 32.2656 26.9226 32.3508 26.8474 32.4168C26.7722 32.4828 26.6806 32.5273 26.5822 32.5454C26.3485 32.5973 26.2937 32.456 26.311 32.2569C26.353 31.9258 26.4676 31.608 26.6466 31.3262C26.8257 31.0445 27.0647 30.8057 27.3466 30.627C27.5139 30.5117 28.163 30.4193 28.1226 30.1338C28.1226 30.0443 27.8774 29.9405 27.7995 29.9145C27.616 29.8756 27.4263 29.8756 27.2428 29.9145C26.9138 29.9753 26.5788 29.9976 26.2447 29.9809C26.1437 29.9549 25.8062 29.8886 25.8062 29.7328C25.8062 29.577 26.0254 29.5655 26.1177 29.5395H26.1033ZM41.3231 28.4C41.2222 28.5443 40.0164 29.1645 40.5212 29.4357C40.6914 29.528 40.8847 29.4357 41.0664 29.4097C41.1962 29.3837 41.3231 29.3722 41.453 29.3578C41.776 29.3578 41.8684 29.6809 42.1136 29.8251C42.4366 30.0328 43.0713 29.6693 42.9415 29.2481C42.9155 29.1328 42.7857 29.0693 42.7482 28.9395C42.7237 28.8283 42.7237 28.7131 42.7482 28.602C42.8261 28.3683 42.7742 28.2385 42.5174 28.1491C42.3153 28.1035 42.1255 28.015 41.9607 27.8894C41.8568 27.8116 41.727 27.6298 41.6232 27.774C41.5765 27.8737 41.5379 27.9769 41.5078 28.0827C41.4606 28.197 41.3942 28.3023 41.3116 28.3943L41.3231 28.4ZM33.8286 20.7642C33.6988 21.1247 34.1171 21.1248 34.3334 20.9834C34.6594 20.7757 34.9104 20.9834 35.2537 20.9459C35.3208 20.9607 35.391 20.9511 35.4517 20.9187C35.5124 20.8863 35.5595 20.8334 35.5845 20.7693C35.6096 20.7053 35.611 20.6344 35.5884 20.5695C35.5658 20.5045 35.5208 20.4498 35.4614 20.4151C35.273 20.2493 35.0364 20.1482 34.7863 20.1266C34.6335 20.0891 34.3738 20.0372 34.244 20.1526C34.066 20.3266 33.9247 20.5345 33.8286 20.7642ZM34.3854 16.388C34.3075 16.6217 34.645 16.6765 34.8008 16.6217C34.8876 16.5651 34.9863 16.5296 35.0892 16.5178C35.1921 16.5233 35.2951 16.5233 35.3979 16.5178C35.5018 16.4803 35.9749 16.2467 35.8768 16.0794C35.7989 15.964 35.4123 16.013 35.2998 16.013C35.0114 16.013 34.4979 16.0534 34.394 16.4024L34.3854 16.388ZM36.3787 15.2486C35.9777 15.7938 37.1576 15.5976 37.3364 15.5861C37.4655 15.5854 37.5933 15.612 37.7115 15.664C37.9855 15.7678 38.3086 15.5601 38.6057 15.5601C38.799 15.5601 39.6673 15.8486 39.7596 15.5601C39.8519 15.2716 39.2173 15.3034 39.0471 15.3149C38.6166 15.3153 38.1947 15.1943 37.8297 14.9659C37.627 14.8352 37.3862 14.7763 37.1461 14.7985C37.0162 14.7985 36.9643 14.888 36.8576 14.9543C36.6847 15.0287 36.5265 15.1332 36.3903 15.263L36.3787 15.2486ZM34.6335 14.0312C34.7085 14.0976 34.8642 14.0975 34.9565 14.135C35.0709 14.2072 35.1983 14.2562 35.3316 14.2793C35.4729 14.2793 35.822 14.2793 35.822 14.0716C35.822 13.8639 35.4614 13.8004 35.2912 13.7831C35.1307 13.7193 34.9591 13.6879 34.7863 13.6908C34.6335 13.7052 34.4633 13.887 34.6335 14.0399V14.0312ZM33.8286 15.263C34.0767 15.5716 34.5671 15.4188 34.8787 15.3409C35.0344 15.3149 35.1902 15.263 35.2393 15.0928C35.253 15.0573 35.2589 15.0192 35.2563 14.9812C35.2537 14.9432 35.2428 14.9063 35.2244 14.873C35.2059 14.8397 35.1804 14.8108 35.1496 14.7885C35.1187 14.7662 35.0834 14.7509 35.046 14.7437C34.8753 14.712 34.7003 14.712 34.5296 14.7437C34.27 14.7697 33.494 14.836 33.8286 15.263ZM37.9336 13.786C38.1153 13.9937 38.4384 13.9302 38.6836 13.8899L39.0846 13.812C39.2404 13.786 39.4077 13.812 39.5779 13.812C39.7481 13.812 39.849 13.7456 39.9904 13.7196C40.1318 13.6937 40.1866 13.7196 40.2241 13.5783C40.2547 13.471 40.2455 13.3562 40.1981 13.2552C40.0827 13.0735 39.6673 13.0735 39.4856 13.0475C39.2559 12.972 39.0112 12.9542 38.773 12.9956C38.6461 13.059 38.4846 13.1514 38.3461 13.2148C38.2076 13.2783 37.6999 13.5379 37.9336 13.7918V13.786ZM32.3401 16.2063C32.1209 16.414 31.6795 16.5813 31.8093 16.9448C31.9391 17.3083 32.4699 17.19 32.7411 17.0746C33.1491 16.9369 33.5 16.6682 33.7392 16.3101C33.8027 16.2063 33.9584 16.1428 33.9988 16.039C33.8247 15.9055 33.6094 15.8372 33.3901 15.8457C33.2841 15.8543 33.1795 15.8756 33.0786 15.9092C32.9477 15.9091 32.8172 15.9227 32.6891 15.9495C32.5547 16.0072 32.4352 16.0951 32.3401 16.2063ZM28.7948 14.9947C28.6909 15.0582 28.3419 15.2139 28.3015 15.3293C28.2236 15.563 28.7025 15.5745 28.8323 15.5745C29.1438 15.6005 29.4409 15.6928 29.7525 15.6928C30.1275 15.6928 30.491 15.6005 30.8516 15.5745C31.2122 15.5486 31.5641 15.6784 31.9132 15.589C32.0689 15.5486 32.2766 15.4851 32.3141 15.3178C32.3661 15.0841 32.1468 15.1476 31.991 15.1101C31.8614 15.0653 31.736 15.0093 31.616 14.9428C31.4306 14.8789 31.2316 14.8649 31.0391 14.9024C30.7275 14.9803 30.5487 15.2255 30.2112 15.2139C29.9951 15.1696 29.7889 15.0866 29.6025 14.9687C29.4756 14.9118 29.3375 14.8846 29.1985 14.8891C29.0595 14.8936 28.9234 14.9297 28.8005 14.9947H28.7948ZM40.6914 12.9754C40.651 13.1312 40.8962 13.1687 41.0001 13.1946C41.2429 13.231 41.4875 13.2541 41.7328 13.2639C41.8222 13.2639 42.0443 13.2898 41.9924 13.4196C41.9405 13.5495 41.6693 13.6245 41.577 13.6764C41.3526 13.7994 41.1069 13.8787 40.8529 13.91C40.276 13.9879 39.725 14.1697 39.1567 14.2851C38.975 14.311 38.4961 14.3514 38.4701 14.5735C38.4326 14.8966 39.0471 14.7149 39.2202 14.7149C39.5399 14.6889 39.8611 14.6889 40.1808 14.7149C40.452 14.7149 40.7116 14.8072 40.9827 14.7928C41.2594 14.76 41.532 14.6991 41.7962 14.611C42.0725 14.4892 42.337 14.3424 42.5867 14.1726C43.2098 13.8841 43.8675 13.8841 44.5165 13.7052C44.7744 13.6131 45.0373 13.5361 45.3041 13.4745C45.4743 13.4485 45.6416 13.4485 45.8089 13.4081C45.9272 13.3821 46.057 13.3821 46.1724 13.3446C46.3246 13.2973 46.4723 13.2365 46.6137 13.1629C46.7818 13.0672 46.9654 13.0018 47.1561 12.9696C47.3234 12.9552 47.4936 12.9033 47.6609 12.8773C47.8213 12.853 47.9782 12.8094 48.1282 12.7475C48.1917 12.7215 48.5292 12.6321 48.5292 12.5398C48.5292 12.4475 48.385 12.4763 48.3475 12.4648C48.2397 12.458 48.1341 12.4316 48.0359 12.3869C47.8542 12.309 47.5974 12.3869 47.3897 12.3869C47.0263 12.3869 46.6512 12.4129 46.2878 12.4129C46.1059 12.4167 45.9247 12.4341 45.7454 12.4648C45.5781 12.4879 45.4079 12.4648 45.2406 12.4879C44.9347 12.5196 44.6263 12.5196 44.3204 12.4879C44.1492 12.4212 43.9712 12.3738 43.7896 12.3465C43.1059 12.3725 42.5088 12.8513 41.8222 12.7735C41.6129 12.7447 41.4014 12.736 41.1904 12.7475C41.1105 12.7772 41.0324 12.8119 40.9568 12.8513C40.8789 12.8888 40.6972 12.8888 40.6856 12.9927L40.6914 12.9754ZM36.6528 16.1717C36.4631 16.2424 36.2844 16.3395 36.122 16.4601C35.8335 16.665 35.5018 17.1438 35.9547 17.3919C36.0887 17.4643 36.2441 17.4868 36.3931 17.4554C36.6528 17.4294 36.8864 17.2881 37.1316 17.4179C37.1836 17.4438 37.2355 17.4929 37.2874 17.5188C37.4216 17.5721 37.5607 17.6117 37.7028 17.6371C37.9799 17.7361 38.2756 17.7716 38.5682 17.741C38.6792 17.718 38.7926 17.7093 38.9057 17.715C39.021 17.7363 39.1333 17.7712 39.2404 17.8189C39.3786 17.8412 39.5088 17.8988 39.6183 17.9862C39.6962 18.0756 39.7452 18.1939 39.8115 18.2746C39.9178 18.3717 40.0015 18.4908 40.0567 18.6237C40.079 18.6781 40.0882 18.7369 40.0837 18.7955C40.0792 18.8541 40.0611 18.9108 40.0308 18.9612C39.9651 19.0675 39.8623 19.1456 39.7423 19.1804C39.6521 19.239 39.5697 19.3088 39.4971 19.3881C39.4452 19.4401 39.4192 19.518 39.3529 19.5699C39.2865 19.6218 39.249 19.6478 39.2 19.6997C39.1128 19.7957 39.0161 19.8827 38.9115 19.9593C38.7203 19.9946 38.5238 19.9897 38.3346 19.9449C38.2455 19.9361 38.1581 19.9147 38.0749 19.8814C37.9666 19.8447 37.8498 19.841 37.7394 19.8708C37.629 19.9006 37.5299 19.9625 37.4547 20.0487C37.4166 20.0851 37.3892 20.1313 37.3755 20.1821C37.3618 20.233 37.3622 20.2866 37.3768 20.3372C37.4049 20.3889 37.4467 20.4319 37.4976 20.4614C37.5485 20.4909 37.6065 20.5058 37.6653 20.5045C37.8067 20.5045 37.9538 20.467 38.0922 20.467C38.2082 20.4551 38.3248 20.4503 38.4413 20.4526C38.5615 20.4538 38.6787 20.4899 38.7788 20.5565C39.0125 20.7122 39.1279 20.9834 39.3558 21.1334C39.4971 21.2257 39.6673 21.2776 39.7942 21.3671C39.9033 21.4377 40.0074 21.5158 40.1058 21.6007C40.1862 21.6833 40.2851 21.7456 40.3943 21.7825C40.43 21.7963 40.4682 21.8029 40.5065 21.8018C40.5448 21.8007 40.5826 21.7919 40.6175 21.7761C40.6524 21.7602 40.6838 21.7376 40.7099 21.7095C40.7359 21.6813 40.7561 21.6483 40.7693 21.6123C40.7887 21.5548 40.7954 21.4939 40.7889 21.4336C40.7824 21.3734 40.7629 21.3152 40.7318 21.2632C40.7021 21.1979 40.6947 21.1247 40.7109 21.0548C40.7271 20.9849 40.7658 20.9223 40.8212 20.8767C40.9395 20.7728 41.0433 20.8622 41.1587 20.9286C41.2265 20.976 41.3061 21.0035 41.3887 21.0081C41.4712 21.0127 41.5534 20.9941 41.626 20.9546C41.776 20.8671 41.9004 20.7418 41.9866 20.5911C42.0645 20.3834 41.8972 20.3199 41.753 20.2161C41.6811 20.1661 41.6241 20.0976 41.5881 20.0179C41.552 19.9381 41.5382 19.8501 41.5482 19.7632C41.5482 19.593 41.626 19.3997 41.8049 19.4516C42.0011 19.5093 42.1681 19.6391 42.2722 19.8151C42.3095 19.8879 42.3625 19.9515 42.4274 20.0014C42.4922 20.0513 42.5673 20.0861 42.6472 20.1036C42.7449 20.1087 42.8421 20.0875 42.9289 20.0424C43.0156 19.9973 43.0887 19.9297 43.1405 19.8468C43.2675 19.7026 43.4492 19.6391 43.5934 19.4978C43.6626 19.4464 43.7092 19.3704 43.7238 19.2855C43.7383 19.2006 43.7195 19.1134 43.6713 19.042C43.6309 18.9929 43.553 18.941 43.5011 18.8891C43.4754 18.8467 43.4414 18.8098 43.4013 18.7806C43.3612 18.7513 43.3157 18.7304 43.2675 18.7189C43.027 18.692 42.7966 18.6079 42.5953 18.4737C42.5434 18.4218 42.4395 18.3439 42.4395 18.2544C42.4395 18.165 42.6213 18.1362 42.6992 18.1102C42.8549 18.0583 43.1261 18.0208 43.0626 17.8015C43.0136 17.6427 42.9119 17.5053 42.7742 17.4121C42.6083 17.292 42.4315 17.1877 42.2463 17.1005C41.9203 16.9217 41.5078 17.063 41.1962 16.8121C41.1558 16.774 41.1124 16.7393 41.0664 16.7082C41.0135 16.6828 40.9571 16.6653 40.8991 16.6563C40.6259 16.5765 40.3399 16.55 40.0567 16.5784C39.923 16.5919 39.7883 16.5647 39.6702 16.5005C39.5663 16.4486 39.5663 16.3332 39.526 16.2409C39.3961 16.0072 38.9692 16.0217 38.75 16.0072C38.6335 15.9973 38.5165 16.0202 38.4125 16.0736C38.3129 16.1059 38.2081 16.1186 38.1038 16.1111C37.9595 16.0851 37.8153 16.0592 37.6768 16.0476C37.556 16.0344 37.4342 16.0344 37.3134 16.0476C37.2438 16.0452 37.1742 16.0501 37.1057 16.0621C37.053 16.0588 37.0008 16.0501 36.9499 16.0361C36.8476 16.0568 36.7498 16.0959 36.6614 16.1515L36.6528 16.1717ZM23.9802 17.1438C24.1879 17.0919 24.3956 17.1179 24.6033 17.0515C24.7771 16.9624 24.9586 16.889 25.1456 16.8323C25.2494 16.8323 25.6244 16.8323 25.6619 16.9621C25.7139 17.1438 25.3908 17.1554 25.3908 17.3371C25.3908 17.5188 25.7139 17.5188 25.8696 17.5188C25.962 17.5188 26.3629 17.4294 26.4264 17.5188C26.5562 17.6487 26.0514 17.7265 25.962 17.741C25.7139 17.7669 25.0965 17.8188 25.4687 18.1939C26.0254 18.7247 27.0495 18.064 27.6582 17.9746C28.0285 17.9472 28.4007 17.9862 28.7573 18.09C28.939 18.116 29.1323 18.116 29.314 18.1419C29.4958 18.1679 29.7006 18.2718 29.891 18.2314C30.0814 18.191 30.2025 17.9746 30.3439 17.8564C30.4852 17.7381 30.8487 17.7525 30.9006 17.5679C30.941 17.3227 30.566 17.3227 30.5256 17.115C30.4852 16.9073 30.8747 16.7515 30.8141 16.4803C30.7535 16.2092 30.4131 16.1919 30.2371 16.2467C29.9487 16.3505 29.8737 16.5957 29.6602 16.74C29.4467 16.8842 29.4121 16.6996 29.2044 16.5842C29.0275 16.4725 28.8184 16.4227 28.6101 16.4428C28.2215 16.4916 27.8269 16.4512 27.4562 16.3246C27.1851 16.2092 27.1216 15.938 26.8793 15.8082C26.672 15.7363 26.4516 15.7098 26.2331 15.7303C25.8177 15.7303 25.1831 15.7043 24.86 15.964C24.7561 16.039 24.7186 16.1313 24.6033 16.1688C24.4938 16.1751 24.3849 16.1886 24.2773 16.2092C24.1769 16.2472 24.0804 16.2946 23.9888 16.3505C23.943 16.3774 23.8947 16.3996 23.8446 16.4169C23.8229 16.4243 23.8017 16.4329 23.7811 16.4428C23.7571 16.4566 23.7306 16.4654 23.7032 16.4688C23.6237 16.4987 23.5525 16.5472 23.4955 16.6102C23.4544 16.6422 23.4192 16.6813 23.3917 16.7255C23.3917 16.7659 23.3657 16.7919 23.3542 16.8294C23.3388 16.8632 23.3253 16.8979 23.3138 16.9332C23.31 16.9715 23.315 17.0101 23.3285 17.0462C23.342 17.0822 23.3636 17.1146 23.3917 17.1409C23.4494 17.1908 23.5231 17.2184 23.5994 17.2188C23.7266 17.2267 23.8541 17.2091 23.9744 17.1669L23.9802 17.1438ZM30.0121 45.4776C30.0381 45.6074 29.8967 45.6478 29.7929 45.6709C29.6723 45.6891 29.5571 45.7334 29.4554 45.8007C29.3659 45.893 29.5073 46.0228 29.5852 46.0748C29.8304 46.2161 30.1044 46.0228 30.3612 46.0748C30.5154 46.1257 30.6797 46.1386 30.84 46.1123C31.0102 46.0863 31.166 46.0344 31.3333 46.0084C31.4705 45.9955 31.6086 45.9955 31.7458 46.0084C31.8497 45.994 32.0343 45.9565 32.0343 45.8123C32.0343 45.668 31.7112 45.6334 31.6074 45.619C31.3977 45.5982 31.1949 45.5323 31.0131 45.4257C30.8464 45.2627 30.6342 45.1541 30.4044 45.1142C30.3266 45.1142 30.2602 45.1142 30.1967 45.1142C30.1967 45.1142 30.1592 45.1142 30.1448 45.1142C30.1328 45.1092 30.1193 45.1092 30.1073 45.1142C30.0814 45.1142 30.0554 45.1401 30.041 45.1517C30.0249 45.1658 30.0075 45.1783 29.989 45.1892C29.989 45.2036 29.989 45.2151 29.9631 45.2295L29.9371 45.2555V45.2844C29.956 45.3523 29.9821 45.4181 30.015 45.4805L30.0121 45.4776Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default NorthAmerica;