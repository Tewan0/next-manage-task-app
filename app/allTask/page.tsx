"use client";

import Image from "next/image";
import task from "../../assets/task.png";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Task = {
  id: string;
  title: string;
  detail: string;
  is_completed: boolean;
  image_url: string;
  created_at: string;
  update_at: string;
};

// async function deleteTask(id: string) {
//   const confirmDelete = confirm("คุณต้องการลบงานนี้หรือไม่?");
//   if (confirmDelete) {
//     const { error } = await supabase.from("task_tb").delete().eq("id", id);
//     if (error) {
//       alert('พบปัญหาในการลบข้อมูลจาก Supabase');
//       console.log(error.message);
//     }
//     window.location.reload();
//   }
// }

export default function Page() {
  //สร้างตัวแปร state สำหรับเก็บข้อมูลจาก supabase
  const [Tasks, setTasks] = useState<Task[]>([]);

  //เนื้อหาถูกโหลด ให้ดึงข้อมูลจาก supabase มาแสดงที่หน้าเพจ
  useEffect(() => {
    async function fetchTasks() {
      const { data, error} = await supabase
        .from("task_tb")
        .select("id, title, detail, is_completed, image_url, created_at, update_at")
        .order("created_at", { ascending: false });

      if (error) {
        alert('พบปัญหาในการดึงข้อมูลจาก Supabase');
        console.log(error.message);
        return;
      }

      //ไม่พบ error
      if (data) {
        setTasks(data as Task[]);
      }
    }
    fetchTasks();
  }, []);

  return (
    <div className="flex flex-col w-10/12 mx-auto">
      <div className="flex flex-col items-center mt-20">
        <Image src={task} alt="Task App" width={150} height={150} priority />
        <h1 className="text-2xl font-bold mt-10">Manage Task App</h1>
      </div>
      <div className="flex justify-end">
          <Link
            href="addTask"
            className="mt-10 bg-blue-600 text-white font-bold px-5 py-3 rounded hover:bg-blue-700 transition"
          >
            เพิ่มงาน
          </Link>
        </div>

        {/* แสดงข้อมูลตาราง */}
        <div>
          <table className="border-2 min-w-full border-black text-center text-xl mt-5">
            <thead>
              <tr>
                <th className="border-2 border-black p-2 bg-gray-300">รูป</th>
                <th className="border-2 border-black p-2 bg-gray-300">งานที่ต้องทำ</th>
                <th className="border-2 border-black p-2 bg-gray-300">รายละเอียด</th>
                <th className="border-2 border-black p-2 bg-gray-300">สถานะ</th>
                <th className="border-2 border-black p-2 bg-gray-300">วันที่เพิ่ม</th>
                <th className="border-2 border-black p-2 bg-gray-300">วันที่แก้ไข</th>
                <th className="border-2 border-black p-2 bg-gray-300">Action</th>
              </tr>
            </thead>
            <tbody>
              {Tasks.map((task) => (
                <tr key={task.id}>
                  <td className="border-2 border-black p-2">
                    {task.image_url 
                      ? <Image src={task.image_url} alt="logo" width={100} height={100} className="mx-auto"/>
                      : '-'
                    }
                  </td>
                  <td className="border-2 border-black p-2">{task.title}</td>
                  <td className="border-2 border-black p-2">{task.detail}</td>
                  <td className="border-2 border-black p-2">
                    {task.is_completed ? (
                      <span className="text-green-600 font-bold">เสร็จสิ้น</span>
                    ) : (
                      <span className="text-red-600 font-bold">ยังไม่เสร็จสิ้น</span>
                    )}
                  </td>
                  <td className="border-2 border-black p-2">
                    {new Date(task.created_at).toLocaleDateString()}
                  </td>
                  <td className="border-2 border-black p-2">
                    {new Date(task.update_at).toLocaleDateString()}
                  </td>
                  <td className="border-2 border-black p-2">
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        href={`editTask/${task.id}`}
                        className="bg-green-600 text-white font-bold px-4 py-2 rounded hover:bg-green-700 transition"
                      >
                        แก้ไข
                      </Link>
                      <button className="bg-red-600 text-white font-bold px-4 py-2 rounded hover:bg-red-700 transition">ลบ</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-10">
          <Link href="/" className="text-blue-600 font-bold">กลับไปหน้าแรก</Link>
        </div>

    </div>
  );
}
