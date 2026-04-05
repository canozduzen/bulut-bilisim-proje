# ☁️ Bulut Bilişim Dersi - Proje 1: Görev Yöneticisi (Çift Katmanlı Web Uygulaması)

Bu proje, 3522 Bulut Bilişim Dersi kapsamında geliştirilmiş; backend kısmı RESTful API olarak tasarlanmış ve ön yüzü (frontend) tamamen ayrı inşa edilmiş çift katmanlı bir web uygulamasıdır.

## 🚀 Canlı Demo (AWS EC2)
Uygulama şu anda aktif olarak AWS bulut sunucusu üzerinde çalışmaktadır:
👉 **http://13.62.54.131:5173**

## 🛠️ Kullanılan Teknolojiler
Projeyi geliştirirken modern ve yüksek performanslı diller/araçlar tercih edilmiştir:
* **Frontend:** React.js (Vite)
* **Backend:** Node.js (Express.js)
* **Veritabanı:** PostgreSQL
* **Bulut Platformu:** Amazon Web Services (AWS)
* **Sunucu Yöneticisi:** PM2

## 🏗️ Bulut Mimarisi ve Entegrasyon Adımları
Proje, istenilen teknik çıktılara uygun olarak tamamen bulut ortamında barındırılmaktadır:
1. **Web API ve Frontend Entegrasyonu:** React tabanlı modern ön yüz, Node.js ile yazılmış RESTful API ile asenkron olarak haberleşmektedir.
2. **Bulut Platformlarında Barındırma:** Projenin hem frontend hem de backend kodları **AWS EC2 (Ubuntu t2.micro)** sanal sunucusu üzerinde barındırılmaktadır. PM2 kullanılarak 7/24 kesintisiz çalışması sağlanmıştır.
3. **API ile Veri Yönetimi:** Geçici dizi verileri yerine gerçek bir bulut veritabanı kullanılmıştır. Veriler, **AWS RDS** üzerinde yapılandırılmış PostgreSQL veritabanında güvenli bir şekilde tutulmaktadır.
4. **Yüksek Erişilebilirlik ve Güvenlik:** AWS Security Groups (Güvenlik Grupları) yapılandırılarak Inbound (Gelen) kuralları ayarlanmış; SSH (22), Backend (3000), Frontend (5173) ve PostgreSQL (5432) portları güvenli bir şekilde dışa açılmıştır.

## 📌 API Uç Noktaları (Endpoints)
Backend, veritabanı ile aşağıdaki RESTful uç noktaları üzerinden iletişim kurar:
* `GET /api/todos`: Veritabanındaki tüm görevleri çeker ve listeler.
* `POST /api/todos`: Veritabanına yeni bir görev (task) ekler.
* `DELETE /api/todos/:id`: Belirtilen ID değerine sahip görevi veritabanından kalıcı olarak siler.