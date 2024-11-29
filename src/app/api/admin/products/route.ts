import { S3 } from "aws-sdk";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/auth";
import { supabase } from "@/lib/supabaseClient";

// Configurações do S3 (Supabase)
const s3 = new S3({
  endpoint: "https://xdthwazsvtjtljgsqjvi.supabase.co/storage/v1/s3", // Endpoint do Supabase S3
  region: "sa-east-1", // Região
  accessKeyId: process.env.SUPABASE_ACCESS_KEY_ID, // Chave de acesso (da API)
  secretAccessKey: process.env.SUPABASE_SECRET_ACCESS_KEY, // Chave secreta
});

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  // Verificar se o usuário está autenticado
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Receber os dados do formulário
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const image = formData.get("image") as File;

  // Verificar se a imagem foi enviada
  if (!image) {
    return NextResponse.json({ error: "Image is required" }, { status: 400 });
  }

  // Converter imagem para buffer
  const imageBuffer = Buffer.from(await image.arrayBuffer());
  const imageName = `${Date.now()}-${image.name}`;

  // Fazer o upload da imagem para o S3 (Supabase Storage)
  try {
    const uploadParams = {
      Bucket: "product-images", // Nome do bucket no Supabase
      Key: imageName, // Nome do arquivo
      Body: imageBuffer, // Conteúdo do arquivo
      ContentType: image.type, // Tipo do conteúdo
      ACL: "public-read", // Permissões do arquivo (público)
    };

    // Fazer upload para o Supabase via S3
    const uploadResponse = await s3.putObject(uploadParams).promise();
    console.log("Upload Response:", uploadResponse);

    if (uploadResponse) {
      // Obter URL público da imagem
      const imageUrl = `https://xdthwazsvtjtljgsqjvi.supabase.co/storage/v1/object/public/product-images/${imageName}`;
      console.log("Image URL:", imageUrl);

      // Inserir dados do produto no banco de dados (Supabase)
      const { data, error } = await supabase
        .from("products")
        .insert({ name, description, price, image_url: imageUrl })
        .select();

      if (error) {
        console.error("Supabase error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      console.log("Product Data:", data);
      return NextResponse.json({ product: data[0] });
    } else {
      return NextResponse.json(
        { error: "Failed to upload image" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Erro ao fazer upload da imagem para o S3:", error);
    return NextResponse.json(
      { error: "Error uploading file to S3" },
      { status: 500 }
    );
  }
}
