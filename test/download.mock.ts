import fs from "fs";
import path from "path";
import { exec } from "child_process";
import { promisify } from "util";

const execPromise = promisify(exec);

interface ModelData {
  id: number;
  task_id: string;
  thumbnail_url: string;
  glb_url: string;
  prompt: string;
  type: string;
  draft_model_id: string | null;
}

const data: ModelData[] = [
  {
    id: 1702428,
    task_id: "c672a7ea-7365-4218-bd87-e34ff835d582",
    thumbnail_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240410/c672a7ea-7365-4218-bd87-e34ff835d582/rendered_image.webp?auth_key=1722246505-iaoaCW8sWZw-0-c5606e5421b64a0f2e4b7089970c9689",
    glb_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240410/c672a7ea-7365-4218-bd87-e34ff835d582/mechanical_helmet_draft.glb?auth_key=1722246505-EK6d_RAqJwY-0-f5003bc833c42464d112fdf115fd73b7",
    prompt: "Mechanical helmet",
    type: "text_to_model",
    draft_model_id: null,
  },
  {
    id: 1700458,
    task_id: "71a233c6-80b7-4ea0-afe8-aceb57096696",
    thumbnail_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240410/71a233c6-80b7-4ea0-afe8-aceb57096696/rendered_image.webp?auth_key=1722246505-6R1jTU9R8a8-0-8c0b6cbbbaacfda0c1cdb5b170b8fb0d",
    glb_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240410/71a233c6-80b7-4ea0-afe8-aceb57096696/gorgeous_chair_with_blue_cloth_and_wooden_armrests_draft.glb?auth_key=1722246505-RvW5cf8eTPs-0-ee04477618c86089f7128bdbe222392a",
    prompt: "Gorgeous chair with blue cloth and wooden armrests",
    type: "text_to_model",
    draft_model_id: null,
  },
  {
    id: 1700320,
    task_id: "c631c6b9-568e-4b97-96e1-d450cb58af8a",
    thumbnail_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240410/c631c6b9-568e-4b97-96e1-d450cb58af8a/rendered_image.webp?auth_key=1722246505-SPpX2DJvMLs-0-fd83bd6e98621618cff38bff7791a737",
    glb_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240410/c631c6b9-568e-4b97-96e1-d450cb58af8a/cute_bunny_doll_draft.glb?auth_key=1722246505-fcWXXWauT2w-0-fbc65c24908aa6b35f1b39d833b962c0",
    prompt: "Cute bunny doll",
    type: "text_to_model",
    draft_model_id: null,
  },
  {
    id: 1700256,
    task_id: "03dbd08d-6655-43d9-8dac-73eeecee2bf9",
    thumbnail_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240410/03dbd08d-6655-43d9-8dac-73eeecee2bf9/rendered_image.webp?auth_key=1722246505-XdZYVnSd3Gk-0-90298ada10a2ba2ca3463bc9d9c5f814",
    glb_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240410/03dbd08d-6655-43d9-8dac-73eeecee2bf9/cute_owl_draft.glb?auth_key=1722246505-9maVAQ4iZI8-0-61725c67ee754835ff12202bafae0913",
    prompt: "Cute owl",
    type: "text_to_model",
    draft_model_id: null,
  },
  {
    id: 1701204,
    task_id: "3c4d5297-1e5f-4dd7-8f8f-994881d31583",
    thumbnail_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240410/3c4d5297-1e5f-4dd7-8f8f-994881d31583/rendered_image.webp?auth_key=1722246505-knaSXFtAwL4-0-eb8b27ef651d0ff14bafc669041ea5fc",
    glb_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240410/3c4d5297-1e5f-4dd7-8f8f-994881d31583/student_dog_character_draft.glb?auth_key=1722246505-rB1ptP_hW1U-0-12c8714639c3372220a7bf85ed46acc5",
    prompt: "student dog character",
    type: "text_to_model",
    draft_model_id: null,
  },
  {
    id: 1701918,
    task_id: "20cd097b-e627-42d7-a282-4a7ec1ff434e",
    thumbnail_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240410/20cd097b-e627-42d7-a282-4a7ec1ff434e/rendered_image.webp?auth_key=1722246505-kaabw2ErexQ-0-119fd03c87d1ac48f40ca8b8d57ae36d",
    glb_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240410/20cd097b-e627-42d7-a282-4a7ec1ff434e/cute_bird_draft.glb?auth_key=1722246505-0alkUagz90g-0-f18ae99ab05db4322698271b397cece4",
    prompt: "Cute bird",
    type: "text_to_model",
    draft_model_id: null,
  },
  {
    id: 1702294,
    task_id: "91a09cd5-a78c-4b95-892b-adf80d778e66",
    thumbnail_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240410/91a09cd5-a78c-4b95-892b-adf80d778e66/rendered_image.webp?auth_key=1722246505-0llDaT3pBso-0-fa1c756bbae2e81b8051167fbbc3ffec",
    glb_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240410/91a09cd5-a78c-4b95-892b-adf80d778e66/hamburger_photorealistic_high_quality_photo_textures_draft.glb?auth_key=1722246505-wQKCIJ0pahM-0-b6dcd226859d760240f61f54496163c0",
    prompt: "hamburger photorealistic high quality photo textures",
    type: "text_to_model",
    draft_model_id: null,
  },
  {
    id: 1702349,
    task_id: "1380df48-c9af-4275-8568-b52baed3b3d2",
    thumbnail_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240410/1380df48-c9af-4275-8568-b52baed3b3d2/rendered_image.webp?auth_key=1722246505-evMWoKzl19A-0-1c74333754d8c2f676cceb3a578828d9",
    glb_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240410/1380df48-c9af-4275-8568-b52baed3b3d2/little_fire_dragon_cartoon_draft.glb?auth_key=1722246505-AuQUGI79aRU-0-2c32bcac3fca485fc74fc410ee604899",
    prompt: "Little Fire Dragon, cartoon",
    type: "text_to_model",
    draft_model_id: null,
  },
  {
    id: 1702476,
    task_id: "c484de53-5935-4976-b5b5-3dbeaa479511",
    thumbnail_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240410/c484de53-5935-4976-b5b5-3dbeaa479511/rendered_image.webp?auth_key=1722246505-HYzLEJjfyEU-0-671a674018f0dfd85dfa5cfd2882fbee",
    glb_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240410/c484de53-5935-4976-b5b5-3dbeaa479511/standing_giant_toad_green_skin_animated_style_draft.glb?auth_key=1722246505-PTUm6GXnauQ-0-7425cc617760623c1ae81999a44f34ca",
    prompt: "Standing giant toad, green skin, animated style",
    type: "text_to_model",
    draft_model_id: null,
  },
  {
    id: 1703280,
    task_id: "908caf5f-d04b-48fc-b320-4e2ea8b87db9",
    thumbnail_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240410/908caf5f-d04b-48fc-b320-4e2ea8b87db9/rendered_image.webp?auth_key=1722246505-ck80VlK7tMk-0-7093928493f890888225bd6dfb4786cb",
    glb_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240410/908caf5f-d04b-48fc-b320-4e2ea8b87db9/a_head_sculpt_goblin_draft.glb?auth_key=1722246505-UD4JAdyyUV0-0-25195d400719ec8549415f34f1c4c707",
    prompt: "A head sculpt goblin",
    type: "text_to_model",
    draft_model_id: null,
  },
  {
    id: 1703310,
    task_id: "03d6020b-5e02-4cc0-bfbc-02ba34f30898",
    thumbnail_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240410/03d6020b-5e02-4cc0-bfbc-02ba34f30898/rendered_image.webp?auth_key=1722246505-HYbzXCeo66Q-0-25060836f62a2e040a04361a62dbe6bd",
    glb_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240410/03d6020b-5e02-4cc0-bfbc-02ba34f30898/a_black_raven_draft.glb?auth_key=1722246505-tLoEjkw_a4Y-0-8432584d3b27ddb2f20c9e837b4cac98",
    prompt: "a black raven",
    type: "text_to_model",
    draft_model_id: null,
  },
  {
    id: 1703339,
    task_id: "6d39519e-8524-498e-97fd-9fc0935e1554",
    thumbnail_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240410/6d39519e-8524-498e-97fd-9fc0935e1554/rendered_image.webp?auth_key=1722246505-fLd0u4Zu7CY-0-923432476e8bddc5dfeb32480201c0a9",
    glb_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240410/6d39519e-8524-498e-97fd-9fc0935e1554/a_petite_little_girl_with_shoulder_length_pink_hair_and_a_pair_of_black_headdresses_she_has_green_e_draft.glb?auth_key=1722246505-UOIbpiU5xLY-0-ec9bbed67b5f24b5a8cde3ff06aca881",
    prompt:
      "A petite little girl with shoulder-length pink hair and a pair of black headdresses. She has green eyes and a delicate face. Wear a black dress decorated with a white bow, a pair of long white socks, and a pair of black shoes, cartoon animation style",
    type: "text_to_model",
    draft_model_id: null,
  },
  {
    id: 1703654,
    task_id: "207d046b-b23a-4c61-a882-42021579047c",
    thumbnail_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240410/207d046b-b23a-4c61-a882-42021579047c/rendered_image.webp?auth_key=1722246505-ABSchMHheKY-0-b03a0720a8adb4629bf0053b50e06317",
    glb_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240410/207d046b-b23a-4c61-a882-42021579047c/a_cute_sitting_bear_doll_with_a_big_head_a_small_body_and_small_feet_draft.glb?auth_key=1722246505-sTkIk7jmUWE-0-c4e1b99a4dfe6b38474ac6b1fe5d5525",
    prompt:
      "A cute sitting bear doll with a big head, a small body, and small feet",
    type: "text_to_model",
    draft_model_id: null,
  },
  {
    id: 1703714,
    task_id: "d42cceff-1f8a-4cb6-995f-90315071df1b",
    thumbnail_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240410/d42cceff-1f8a-4cb6-995f-90315071df1b/rendered_image.webp?auth_key=1722246505-dTD9ZxlYki0-0-c4f9442c0a18d622ce07ffe0ed3e6816",
    glb_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240410/d42cceff-1f8a-4cb6-995f-90315071df1b/cute_humanoid_lizard_character_green_scales_monk_robes_cartoon_animation_style_draft.glb?auth_key=1722246505-a_fo6dUfRhg-0-5182d08b66caa82404d161fe7ca45c57",
    prompt:
      "Cute humanoid lizard character, green scales, monk robes, cartoon animation style",
    type: "text_to_model",
    draft_model_id: null,
  },
  {
    id: 1703755,
    task_id: "1a35e5e5-71fc-4444-9b18-b523c096fee6",
    thumbnail_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240410/1a35e5e5-71fc-4444-9b18-b523c096fee6/rendered_image.webp?auth_key=1722246505-nOdaQE6avIw-0-5547933ec96a27ad4c36a758c42db4c3",
    glb_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240410/1a35e5e5-71fc-4444-9b18-b523c096fee6/cute_mech_draft.glb?auth_key=1722246505-FK9pAb5iTRM-0-315de7e3981ff14780630fd8bc71fc2c",
    prompt: "cute mech",
    type: "text_to_model",
    draft_model_id: null,
  },
  {
    id: 1703836,
    task_id: "d77e7e99-d4bd-498a-81b4-95e85fdac6be",
    thumbnail_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240410/d77e7e99-d4bd-498a-81b4-95e85fdac6be/rendered_image.webp?auth_key=1722246505-iB7M0nhmxf4-0-6586f0c1f8284b3f1fca72c58a8a13fd",
    glb_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240410/d77e7e99-d4bd-498a-81b4-95e85fdac6be/a_golem_made_of_stone_draft.glb?auth_key=1722246505-wSawQ4Owmjw-0-8905ab6245f6709a5e0a6b5f028b8a49",
    prompt: "a golem made of stone",
    type: "text_to_model",
    draft_model_id: null,
  },
  {
    id: 1703811,
    task_id: "f13bb25a-ca9e-4266-b00c-77abcf09851c",
    thumbnail_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240410/f13bb25a-ca9e-4266-b00c-77abcf09851c/rendered_image.webp?auth_key=1722246505-7NfUTr8bKRo-0-74b04dbf6ff40347c77e9f296c1b493a",
    glb_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240410/f13bb25a-ca9e-4266-b00c-77abcf09851c/cute_ghost_cartoon_style_draft.glb?auth_key=1722246505-HHZAHgBVVM0-0-0a29de35065b5897ddcfd394c2ed91d1",
    prompt: "Cute ghost, cartoon style",
    type: "text_to_model",
    draft_model_id: null,
  },
  {
    id: 1802094,
    task_id: "0fc3e69d-4f4c-489c-8925-2b1d2bcd5e3d",
    thumbnail_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240415/0fc3e69d-4f4c-489c-8925-2b1d2bcd5e3d/rendered_image.webp?auth_key=1722246505-vPdiZiMnu00-0-b62bff4e5bc0dfdc25e780fd57adeb95",
    glb_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240415/0fc3e69d-4f4c-489c-8925-2b1d2bcd5e3d/goat_alien_wearing_a_gothic_outfit_full_body_holding_a_stick_cartoon_style_draft.glb?auth_key=1722246505-x61n5aAMuSA-0-44b42365704d9cc975d4dd77c41ff471",
    prompt:
      "goat alien, wearing a gothic outfit, full body, holding a stick, cartoon style",
    type: "text_to_model",
    draft_model_id: null,
  },
  {
    id: 1811065,
    task_id: "d78f7cdf-61ab-46eb-9cb9-f9cfb88aa627",
    thumbnail_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240415/d78f7cdf-61ab-46eb-9cb9-f9cfb88aa627/rendered_image.webp?auth_key=1722246505-oGRWCaSbvpI-0-99fa0e55a09ea6f192787e2a83adbbd3",
    glb_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240415/d78f7cdf-61ab-46eb-9cb9-f9cfb88aa627/cute_fat_penguin_walking_cartoon_style_draft.glb?auth_key=1722246505-XaHTv7_JA_8-0-45b3dcd19abab4a0d4fe64150e50e0b9",
    prompt: "Cute, fat penguin walking, cartoon style",
    type: "text_to_model",
    draft_model_id: null,
  },
  {
    id: 1703881,
    task_id: "c1d7f1f3-ca21-46e4-b0b1-7c38aac19228",
    thumbnail_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240410/c1d7f1f3-ca21-46e4-b0b1-7c38aac19228/rendered_image.webp?auth_key=1722246505-otMayhFRLuc-0-eb95fee22feb8d8728052f44fbe1106a",
    glb_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240410/c1d7f1f3-ca21-46e4-b0b1-7c38aac19228/design_a_d_model_of_an_ornate_samurai_mask_focusing_on_detailed_traditional_japanese_craftsmanship_draft.glb?auth_key=1722246505-Dw2GxMTATAA-0-2af0657543ab28726d9bd7512cf2194d",
    prompt:
      "Design a 3D model of an ornate samurai mask, focusing on detailed traditional Japanese craftsmanship. Highlight intricate patterns, fierce facial expressions, and the elegant yet intimidating design typical of samurai armor.",
    type: "text_to_model",
    draft_model_id: null,
  },
  {
    id: 1801857,
    task_id: "1912d2c9-9fbe-4316-8d5b-8f74369a276a",
    thumbnail_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240415/1912d2c9-9fbe-4316-8d5b-8f74369a276a/rendered_image.webp?auth_key=1722246505-_ldQOyogZYQ-0-7e82c860bc4b059d83f8dc64c0afada7",
    glb_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240415/1912d2c9-9fbe-4316-8d5b-8f74369a276a/robot_small_cute_full_body_wearing_a_space_suit_smooth_texture_draft.glb?auth_key=1722246505-BxTgrUitAQw-0-6f6e5a4f3128aea5ce862eb0342f2902",
    prompt:
      "robot, small, cute, full body, wearing a space suit, smooth texture",
    type: "text_to_model",
    draft_model_id: null,
  },
  {
    id: 1807520,
    task_id: "8651e516-975b-460b-8711-98ed8a14c5f4",
    thumbnail_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240415/8651e516-975b-460b-8711-98ed8a14c5f4/rendered_image.webp?auth_key=1722246505-3f1JY9WHk1M-0-3b58d50e75e625d67a4744bf6f4e7f90",
    glb_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240415/8651e516-975b-460b-8711-98ed8a14c5f4/shiny_medieval_upper_body_armor_with_detailed_carving_and_polished_metallic_luster_draft.glb?auth_key=1722246505-bLJ2LrWxA5A-0-c93f7136d7e3ccb3cf095ec21b8b04ed",
    prompt:
      "Shiny medieval upper body armor with detailed carving and polished metallic luster",
    type: "text_to_model",
    draft_model_id: null,
  },
  {
    id: 1801902,
    task_id: "bbddada3-db54-43ee-a3da-66bce4fa8706",
    thumbnail_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240415/bbddada3-db54-43ee-a3da-66bce4fa8706/rendered_image.webp?auth_key=1722246505-cN36QaxZ9vE-0-7f9075e0924fc635f9c36d248779e355",
    glb_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240415/bbddada3-db54-43ee-a3da-66bce4fa8706/green_humanoid_alien_wearing_white_gothic_mysterious_dress_full_body_holding_a_microphone_wearin_draft.glb?auth_key=1722246505-mpo6m51YoY0-0-c336d98456bab126be3490b40b15c1db",
    prompt:
      "Green humanoid alien, wearing white gothic mysterious dress, full body, holding a microphone, wearing a hat, red eyes, smooth texture, cartoon style",
    type: "text_to_model",
    draft_model_id: null,
  },
  {
    id: 1810106,
    task_id: "5aec2709-b281-4a31-8a82-0e72250b37e2",
    thumbnail_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240415/5aec2709-b281-4a31-8a82-0e72250b37e2/rendered_image.webp?auth_key=1722246505-EoKy0KLcZYM-0-429f6ebdb2bd4431d0cb0fa0a423f7d0",
    glb_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240415/5aec2709-b281-4a31-8a82-0e72250b37e2/sneaker_shoe_futuristic_skeletal_flowing_anatomical_low_profile_segmented_minimal_barefoot_sho_draft.glb?auth_key=1722246505-QpKTcIaQ6l0-0-938e7d8c01c46d5cfa4527e24192db64",
    prompt:
      "sneaker shoe futuristic, skeletal, flowing, anatomical, low profile, segmented, minimal barefoot sho",
    type: "text_to_model",
    draft_model_id: null,
  },
  {
    id: 1811861,
    task_id: "0a4c4063-12f1-4d7b-b97a-c0c0df2063ed",
    thumbnail_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240415/0a4c4063-12f1-4d7b-b97a-c0c0df2063ed/rendered_image.webp?auth_key=1722246505-CvELRkKj7i0-0-623ee49d0a0a23e5d6cca298666683a5",
    glb_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240415/0a4c4063-12f1-4d7b-b97a-c0c0df2063ed/fat_orange_cat_with_straw_hat_sitting_on_the_river_fishing_cartoon_style_draft.glb?auth_key=1722246505-Bog9rW6KHd4-0-2c43233d560e32bbfc4bfd87863d0672",
    prompt:
      "Fat orange cat with straw hat sitting on the river fishing, cartoon style",
    type: "text_to_model",
    draft_model_id: null,
  },
  {
    id: 1810538,
    task_id: "e3d96508-a1bd-49de-89c3-796a650c01f8",
    thumbnail_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240415/e3d96508-a1bd-49de-89c3-796a650c01f8/rendered_image.webp?auth_key=1722246505-_otXDkeJ3sE-0-9efd5e6cc45cb7efc0f0a62e34f9676d",
    glb_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240415/e3d96508-a1bd-49de-89c3-796a650c01f8/helmet_anime_gundam_horns_draft.glb?auth_key=1722246505-DZNmdFBHUoo-0-ef35b7d650f25562d73aae491e76ae1a",
    prompt: "helmet, anime, gundam horns",
    type: "text_to_model",
    draft_model_id: null,
  },
  {
    id: 1837932,
    task_id: "c8bd3f4a-5156-442c-8de4-a26c83dc0195",
    thumbnail_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240416/c8bd3f4a-5156-442c-8de4-a26c83dc0195/rendered_image.webp?auth_key=1722246505-zMV3iZok1JU-0-3e5559452ac85b0dda9a62a747c44d33",
    glb_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240416/c8bd3f4a-5156-442c-8de4-a26c83dc0195/male_orc_green_skin_long_teeth_blue_eyes_short_black_hair_beard_armor_shoulderplate_breastpl_draft.glb?auth_key=1722246505-M4KE1XyTbIE-0-075fcc22446403caa9ce411c1b2f7e2a",
    prompt:
      "Male Orc, green skin, long teeth, blue eyes, short black hair, beard, armor, shoulderplate, breastplate, shield, upper body, standing, dark style",
    type: "text_to_model",
    draft_model_id: null,
  },
  {
    id: 1830565,
    task_id: "eee2ee5d-715a-42ad-970c-2d057e05b1f0",
    thumbnail_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240416/eee2ee5d-715a-42ad-970c-2d057e05b1f0/rendered_image.webp?auth_key=1722246505-HSRMaVJQqyM-0-5022d6695a59cda991bf44717db2fbb6",
    glb_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240416/eee2ee5d-715a-42ad-970c-2d057e05b1f0/the_colorful_paint_blends_together_to_form_the_perfect_outline_of_a_colorful_parrot_perched_on_a_twi_draft.glb?auth_key=1722246505-5CNTrEaTS3c-0-0180dfd89d66e205e3604b7bd980d8a5",
    prompt:
      "The colorful paint blends together to form the perfect outline of a colorful parrot perched on a twig, intricate details, highly detailed, bright colors, cartoonish style",
    type: "text_to_model",
    draft_model_id: null,
  },
  {
    id: 1812073,
    task_id: "7aa06866-7e58-41c8-9d7c-2ebdc3763728",
    thumbnail_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240415/7aa06866-7e58-41c8-9d7c-2ebdc3763728/rendered_image.webp?auth_key=1722246505-hTeY_RK9sN0-0-cc4fe345c84eaed029635742c2167a6f",
    glb_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240415/7aa06866-7e58-41c8-9d7c-2ebdc3763728/messy_auburn_haired_very_cute_disney_pixar_chinchilla_character_wearing_cool_clothes_iconic_movie_draft.glb?auth_key=1722246505-IvOsi7j3aW8-0-9cafcf16b0b288e4d8c5e785a14d4b5f",
    prompt:
      "Messy auburn-haired, very cute Disney Pixar chinchilla character wearing cool clothes, iconic movie characters, detailed fur, concept art, cartoon style",
    type: "text_to_model",
    draft_model_id: null,
  },
  {
    id: 1812608,
    task_id: "3580c2b0-c686-4550-99ba-3d3a16f85543",
    thumbnail_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240415/3580c2b0-c686-4550-99ba-3d3a16f85543/rendered_image.webp?auth_key=1722246505-jujs3UBXNQg-0-f4c958510a71bf7258b376717458227a",
    glb_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240415/3580c2b0-c686-4550-99ba-3d3a16f85543/short_hair_maid_high_detail_movie_lighting_elegant_high_detail_realistic_realistic_style_draft.glb?auth_key=1722246505-kvzkC8nO7ws-0-7d18dc2cfd063ce3da43aadc83ffc006",
    prompt:
      "Short hair, maid, high detail, movie lighting, elegant, high detail, realistic, realistic style",
    type: "text_to_model",
    draft_model_id: null,
  },
  {
    id: 1836868,
    task_id: "463296f7-e4bb-4f91-b9db-a2ec07f2d17b",
    thumbnail_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240416/463296f7-e4bb-4f91-b9db-a2ec07f2d17b/rendered_image.webp?auth_key=1722246505-c5ypvXE8cnU-0-2f0be45cac9a44413ac5f74ad9e95a42",
    glb_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240416/463296f7-e4bb-4f91-b9db-a2ec07f2d17b/big_gray_wolf_running_cartoon_style_draft.glb?auth_key=1722246505-agRj2vr4JeM-0-47972fcf3be1597d848f23d06dfbdaba",
    prompt: "Big gray Wolf, running, cartoon style",
    type: "text_to_model",
    draft_model_id: null,
  },
  {
    id: 1839320,
    task_id: "bf376965-22a9-4c6d-a4b0-6c622b959b25",
    thumbnail_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240416/bf376965-22a9-4c6d-a4b0-6c622b959b25/rendered_image.webp?auth_key=1722246505-idadnoQ5xvw-0-2e8bb6a9e7dc23b67dabcf97fc1adfab",
    glb_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240416/bf376965-22a9-4c6d-a4b0-6c622b959b25/cartoon_rabbit_riding_a_pig_draft.glb?auth_key=1722246505-m4AYsDG2mYY-0-07cf464f0fb70bccbe01b68b6310f799",
    prompt: "cartoon rabbit riding a pig",
    type: "text_to_model",
    draft_model_id: null,
  },
  {
    id: 1841209,
    task_id: "0ca868ee-a14a-40d2-97ef-d10f284abac5",
    thumbnail_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240416/0ca868ee-a14a-40d2-97ef-d10f284abac5/rendered_image.webp?auth_key=1722246505-DEvyd3Va4D8-0-cc5c26974567200b66d0d713aefe2745",
    glb_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240416/0ca868ee-a14a-40d2-97ef-d10f284abac5/lazboy_rocker_recliner_leather_photorealism_draft.glb?auth_key=1722246505-hMh6Kt3FvsE-0-1970a110b55a12d24562191f8de2a72a",
    prompt: "lazboy rocker recliner, leather, photorealism",
    type: "text_to_model",
    draft_model_id: null,
  },
  {
    id: 1837559,
    task_id: "a58d3802-8851-40c5-a156-60fe1ca0d288",
    thumbnail_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240416/a58d3802-8851-40c5-a156-60fe1ca0d288/rendered_image.webp?auth_key=1722246505-WwAzfOu5AuY-0-075425c4d5b77ff985b03ea5d05deb6c",
    glb_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240416/a58d3802-8851-40c5-a156-60fe1ca0d288/muscular_claws_green_scales_crocodile_head_crocodile_tail_handheld_spear_pharaoh_hood_amber_e_draft.glb?auth_key=1722246505-KTfmKFoh1rA-0-3adb2d60575934c0008837fefbfe2594",
    prompt:
      "Muscular, claws, green scales, crocodile head, crocodile tail, handheld spear, Pharaoh hood, amber eyes, cartoon style",
    type: "text_to_model",
    draft_model_id: null,
  },
  {
    id: 1829369,
    task_id: "d4efc0d1-e9fc-4f6d-90d8-1b19a7224044",
    thumbnail_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240416/d4efc0d1-e9fc-4f6d-90d8-1b19a7224044/rendered_image.webp?auth_key=1722246505-P1PWoLkrg4s-0-f310fe7d35e3cb4d72ff1e15b28a9443",
    glb_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240416/d4efc0d1-e9fc-4f6d-90d8-1b19a7224044/boy_demon_red_eyes_horns_teeth_mask_red_skin_cartoon_style_draft.glb?auth_key=1722246505-NoaMtRha6BM-0-433f34cf3bf18eb3019e4b890bc1fcd1",
    prompt: "Boy, demon, red eyes, horns, teeth, mask, red skin, cartoon style",
    type: "text_to_model",
    draft_model_id: null,
  },
  {
    id: 1841467,
    task_id: "8ef3b0fd-29e5-42ae-9eda-7bb6cbcf8d6a",
    thumbnail_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240416/8ef3b0fd-29e5-42ae-9eda-7bb6cbcf8d6a/rendered_image.webp?auth_key=1722246505-QUl4xTxjvYk-0-07eb6ae02ed1a7eedb3095f7431bf3e9",
    glb_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240416/8ef3b0fd-29e5-42ae-9eda-7bb6cbcf8d6a/kawaii_cartoon_cute_mummy_draft.glb?auth_key=1722246505-AfalVabqwAg-0-11be263c9117346e083638f97386b4ef",
    prompt: "kawaii cartoon cute mummy",
    type: "text_to_model",
    draft_model_id: null,
  },
  {
    id: 1841804,
    task_id: "76bbd234-f6a5-4ade-871c-bffc7530688d",
    thumbnail_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240416/76bbd234-f6a5-4ade-871c-bffc7530688d/rendered_image.webp?auth_key=1722246505-1Df7aQ5iVxA-0-b67ce57f33ae9cda84788776c898380d",
    glb_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240416/76bbd234-f6a5-4ade-871c-bffc7530688d/a_purple_winter_jacket_draft.glb?auth_key=1722246505-9Ur1Kc6vJ0U-0-a0f312e6ca6fb9e088dcb5f8bb68f4e7",
    prompt: "a purple winter jacket",
    type: "text_to_model",
    draft_model_id: null,
  },
  {
    id: 1841717,
    task_id: "5cd5ea45-0f73-4718-943a-0a932b001f62",
    thumbnail_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240416/5cd5ea45-0f73-4718-943a-0a932b001f62/rendered_image.webp?auth_key=1722246505-EG6RfpwQIoI-0-42bc27f8982c6609cbf18d0f39625c63",
    glb_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240416/5cd5ea45-0f73-4718-943a-0a932b001f62/a_polygonal_cowboy_skull_pixar_render_draft.glb?auth_key=1722246505-m4ox9olRPbQ-0-945077bc6c790eb9afb0fd6659caa084",
    prompt: "a polygonal cowboy skull, Pixar render",
    type: "text_to_model",
    draft_model_id: null,
  },
  {
    id: 1837791,
    task_id: "c017c2a9-289b-45f5-9226-0b17bf0b6e2f",
    thumbnail_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240416/c017c2a9-289b-45f5-9226-0b17bf0b6e2f/rendered_image.webp?auth_key=1722246505-qFKqeGOgOzk-0-d4cafb077c4063e3114d51581b9862ba",
    glb_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240416/c017c2a9-289b-45f5-9226-0b17bf0b6e2f/robe_bird_head_beak_black_eyes_black_sclera_pharaonic_turban_cartoon_style_draft.glb?auth_key=1722246505-dwdP4QfQIL8-0-0fb39dc1262005eb3cb39e8c22341f2f",
    prompt:
      "Robe, bird head, beak, black eyes, black sclera, pharaonic turban, cartoon style",
    type: "text_to_model",
    draft_model_id: null,
  },
  {
    id: 1841338,
    task_id: "44ec9969-e336-40d1-b2ae-357a85850aac",
    thumbnail_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240416/44ec9969-e336-40d1-b2ae-357a85850aac/rendered_image.webp?auth_key=1722246505-OsfkUs56y7Y-0-d1def9aeb88d085a2e310c848cb78f45",
    glb_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240416/44ec9969-e336-40d1-b2ae-357a85850aac/a_shiba_inu_dressed_as_the_pope_draft.glb?auth_key=1722246505-k5olvm9wmSA-0-71fa19956fa636a3fe4693e264c6b272",
    prompt: "a shiba inu dressed as the pope",
    type: "text_to_model",
    draft_model_id: null,
  },
  {
    id: 2078539,
    task_id: "70632132-cd56-4652-bdf8-f88efff1f1cb",
    thumbnail_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240424/70632132-cd56-4652-bdf8-f88efff1f1cb/rendered_image.webp?auth_key=1722246505-IkXMuNwLjS4-0-b2a3906772a03bb59d75318c5099b0e9",
    glb_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240424/70632132-cd56-4652-bdf8-f88efff1f1cb/aztec_sculpture_high_definition_detailed_super_realistic_stylized_bust_draft.glb?auth_key=1722246505-1tkQ0QItR08-0-0b980a271dcd43c37c364feac2e127c7",
    prompt:
      "Aztec sculpture, high definition, detailed, super realistic stylized bust",
    type: "text_to_model",
    draft_model_id: null,
  },
  {
    id: 2100626,
    task_id: "4fb4d5d8-e10a-4373-97dd-b3cbe4d887d3",
    thumbnail_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240425/4fb4d5d8-e10a-4373-97dd-b3cbe4d887d3/rendered_image.webp?auth_key=1722246505-2iCa5sbCIns-0-e3e87235968a50377c9345c910f4e3d2",
    glb_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240425/4fb4d5d8-e10a-4373-97dd-b3cbe4d887d3/a_furry_high_detail_little_mouse_warrior_high_necked_linen_hanfu_meditative_posture_realistic_d_draft.glb?auth_key=1722246505-rXi9eZn8sN8-0-544f5e57fcb89da3bda1f7730734d8c8",
    prompt:
      "A furry, high-detail little mouse warrior, high-necked linen Hanfu, meditative posture, realistic, dramatic",
    type: "text_to_model",
    draft_model_id: null,
  },
  {
    id: 2099900,
    task_id: "55be3e4c-3b69-4768-9bd2-88c449d7d858",
    thumbnail_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240425/55be3e4c-3b69-4768-9bd2-88c449d7d858/rendered_image.webp?auth_key=1722246505-qOdQbDKkGLU-0-cae4114c5cb333835e314168a1f06f14",
    glb_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240425/55be3e4c-3b69-4768-9bd2-88c449d7d858/a_close_up_portrait_of_a_furry_little_mole_wearing_a_pointy_hat_a_high_necked_translucent_night_gow_draft.glb?auth_key=1722246505-SovRuaCzLI4-0-12c1f5c7c14d1fba34b4fc0cb542fdba",
    prompt:
      "A close-up portrait of a furry little mole wearing a pointy hat, a high-necked translucent night gown, and an orange glowing translucent, realistic",
    type: "text_to_model",
    draft_model_id: null,
  },
  {
    id: 2131519,
    task_id: "4b63ea86-7962-482d-bca2-d62e78baff3a",
    thumbnail_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240426/4b63ea86-7962-482d-bca2-d62e78baff3a/rendered_image.webp?auth_key=1722246505-aluNt00HrBI-0-93976a7202fe64e2869636ceaee3a908",
    glb_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240426/4b63ea86-7962-482d-bca2-d62e78baff3a/cute_little_humanoid_figure_with_raccoon_ears_and_tail_cartoon_style_draft.glb?auth_key=1722246505-MR5nfzNw6aM-0-6ec1322d6081f6b26819be0b79e512ae",
    prompt:
      "Cute little humanoid figure with raccoon ears and tail, cartoon style",
    type: "text_to_model",
    draft_model_id: null,
  },
  {
    id: 2010561,
    task_id: "39b84267-9c1d-4af6-9587-81260c1aed5a",
    thumbnail_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240422/39b84267-9c1d-4af6-9587-81260c1aed5a/rendered_image.webp?auth_key=1722246505-uXyyFCwxTw8-0-83bd1a3b89f90cfe1e88a8bc41916652",
    glb_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240422/39b84267-9c1d-4af6-9587-81260c1aed5a/muscular_demon_monster_horns_science_fiction_cyberpunk_metal_robot_magma_lava_glowing_molt_draft.glb?auth_key=1722246505-AjlR0wXa2RQ-0-9a461d88b8e15b714c1d4a737b763dae",
    prompt:
      "muscular, demon, monster, horns, science fiction, cyberpunk, metal, robot magma, lava, glowing, molten rock",
    type: "text_to_model",
    draft_model_id: null,
  },
  {
    id: 2133944,
    task_id: "ae52136f-8467-46b5-bc56-af478795d0b0",
    thumbnail_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240426/ae52136f-8467-46b5-bc56-af478795d0b0/rendered_image.webp?auth_key=1722246505-Z_9VPQ3lJtA-0-47d9d1681d0266bc3c36ec7ce899298b",
    glb_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240426/ae52136f-8467-46b5-bc56-af478795d0b0/muscular_werewolf_gray_and_brown_fur_big_fluffy_tail_detailed_fur_glowing_eyes_detailed_werewol_draft.glb?auth_key=1722246505-XinddNf3XVw-0-ad53d8be90b83b3148315d689a9b36af",
    prompt:
      "Muscular werewolf, gray and brown fur, big fluffy tail, detailed fur, glowing eyes, detailed werewolf feet, muscular legs, furry human style, cartoon style",
    type: "text_to_model",
    draft_model_id: null,
  },
  {
    id: 2187118,
    task_id: "5ecadb19-cbf8-4e6f-a904-5cec9b7553e5",
    thumbnail_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240428/5ecadb19-cbf8-4e6f-a904-5cec9b7553e5/rendered_image.webp?auth_key=1722246505-uyQtLf2r2aw-0-4ff1727d8854b034535b07e65c159cc3",
    glb_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240428/5ecadb19-cbf8-4e6f-a904-5cec9b7553e5/female_bust_manga_style_cyberpunk_fox_draft.glb?auth_key=1722246505-iwQ76JyiuWk-0-c5d929470eb81786e049e977e80c0672",
    prompt: "Female bust, manga style, cyberpunk, fox",
    type: "text_to_model",
    draft_model_id: null,
  },
  {
    id: 2177900,
    task_id: "8a044d9d-a1da-4e7e-b8db-a7568262560d",
    thumbnail_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240428/8a044d9d-a1da-4e7e-b8db-a7568262560d/rendered_image.webp?auth_key=1722246505-vEQEvujqYLY-0-ba4f787dc05701f2503959cf9aa8792e",
    glb_url:
      "https://tripo-data.cdn.bcebos.com/tcli_ba9f78ef47fd4c559801b2e57f54d26d/20240428/8a044d9d-a1da-4e7e-b8db-a7568262560d/ogre_draft.glb?auth_key=1722246505-TMGHYteGsvc-0-75bdc77de5d5d34c22ffc18d337c7f5a",
    prompt: "ogre",
    type: "text_to_model",
    draft_model_id: null,
  },
];

async function downloadFile(url: string, outputPath: string): Promise<void> {
  try {
    await execPromise(`curl -o "${outputPath}" "${url}"`);
    console.log(`Successfully downloaded: ${outputPath}`);
  } catch (error) {
    console.error(`Failed to download ${url}: ${error}`);
    throw error;
  }
}

async function ensureDirectoryExists(dirPath: string): Promise<void> {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

async function downloadModels(outputDir: string): Promise<void> {
  await ensureDirectoryExists(outputDir);

  for (const model of data) {
    const modelDir = path.join(outputDir, `model_${model.id}`);
    await ensureDirectoryExists(modelDir);

    const thumbnailExt =
      path.extname(new URL(model.thumbnail_url).pathname) || ".webp";
    const glbExt = path.extname(new URL(model.glb_url).pathname) || ".glb";

    const thumbnailPath = path.join(modelDir, `thumbnail${thumbnailExt}`);
    const glbPath = path.join(modelDir, `model${glbExt}`);

    try {
      await downloadFile(model.thumbnail_url, thumbnailPath);
      await downloadFile(model.glb_url, glbPath);
      console.log(`Downloaded files for model ${model.id}`);
    } catch (error) {
      console.error(`Error downloading files for model ${model.id}`);
    }
  }
}

const outputDirectory = "./downloaded_models";
downloadModels(outputDirectory)
  .then(() => console.log("All downloads completed."))
  .catch((error) => console.error("An error occurred:", error));
