'use client';

import Image from "next/image";
import task from "../../assets/task.png";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Page() {
  //สร้างตัวแปร state สำหรับเก็บข้อมูลจากฟอร์ม
  const [title, setTitle] = useState<string>("");
  const [detail, setDetail] = useState<string>("");
  const [is_completed, setIsCompleted] = useState<boolean>(false);
  const [image_file, setImageFile] = useState<File | null>(null);
  const [preview_file, setPreviewFile] = useState<string>("");

  //ฟังก์ชันเลือกรูปเพื่อพรีวิวก่อนอัปโหลด
  function handleSelectPreview(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] || null;

    setImageFile(file);

    if (file) {
      setPreviewFile(URL.createObjectURL(file as Blob));
    }
  }

  //ฟังก์ชันอัปโหลดรูปไปเก็บที่ Supabase Storage
  async function handleUploadAndSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    alert('อัปโหลดรูปและบันทึกข้อมูลเรียบร้อย');
  }


  return (
    <div className="flex flex-col items-center mt-20">
        <Image
          src={task}
          alt="Task App"
          width={150}
          height={150}
          priority
        />
        <h1 className="text-2xl font-bold mt-10">
          Manage Task App
        </h1>
        <h1 className="text-2xl font-bold">
          เพิ่มงานที่ต้องทำ
        </h1>
        {/* ส่วนเพิ่มงานใหม่ */}
        <div className="w-full max-w-lg border-2 border-gray-300 p-8 mt-10 rounded-xl space-y-6">
          <h1 className="text-center text-xl font-bold">➕ เพิ่มงานใหม่</h1>

          <form onSubmit={handleUploadAndSave}>
            <div>
              <label htmlFor="title" className="text-lg font-bold mb-2 block">งานที่ต้องทำ</label>
              <input id="title" type="text" className="w-full border-2 border-gray-300 rounded-lg p-2" />
            </div>

            <div>
              <label htmlFor="detail" className="text-lg font-bold mb-2 block">รายละเอียดงาน</label>
              <textarea id="detail" className="w-full border-2 border-gray-300 rounded-lg p-2"></textarea>
            </div>

            <div className="flex flex-col">
              <label className="text-lg font-bold mb-2">อัปโหลดรูปภาพ</label>
              <div className="flex items-center gap-4">
                  <input id="fileInput" type="file" className="hidden" accept="image/*" onChange={handleSelectPreview}/>
                  <label htmlFor="fileInput" className="bg-blue-500 rounded-lg px-4 py-2 text-white cursor-pointer hover:bg-blue-600 transition">เลือกรูป</label>

                  {preview_file && (
                    <div className="mt-3">
                      <Image src={preview_file} alt="preview" width={100} height={100} />
                    </div>
                  )}
              </div>
            </div>

            <div>
              <label htmlFor="status" className="text-lg font-bold mb-2 block">สถานะงาน</label>
              <select id="status" className="w-full border-2 border-gray-300 rounded-lg p-2">
                  <option value="0">ยังไม่เสร็จสิ้น</option>
                  <option value="1">เสร็จสิ้น</option>
              </select>
            </div>
            
            <div className="flex justify-center pt-4">
              <button type="submit" className="bg-green-600 hover:bg-green-700 rounded-lg px-6 py-2 text-white font-bold transition">บันทึกเพิ่มงาน</button>
            </div>
          </form>

        </div>
    </div>
  );
}