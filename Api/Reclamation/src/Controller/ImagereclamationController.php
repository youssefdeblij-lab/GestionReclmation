<?php

namespace App\Controller;

use App\Entity\Imagereclamation;
use App\Form\ImagereclamationType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/imagereclamation')]
class ImagereclamationController extends AbstractController
{
    #[Route('/', name: 'imagereclamation_index', methods: ['GET'])]
    public function index(): Response
    {
        $imagereclamations = $this->getDoctrine()
            ->getRepository(Imagereclamation::class)
            ->findAll();

        return $this->render('imagereclamation/index.html.twig', [
            'imagereclamations' => $imagereclamations,
        ]);
    }

    #[Route('/new', name: 'imagereclamation_new', methods: ['GET', 'POST'])]
    public function new(Request $request): Response
    {
        $imagereclamation = new Imagereclamation();
        $form = $this->createForm(ImagereclamationType::class, $imagereclamation);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($imagereclamation);
            $entityManager->flush();

            return $this->redirectToRoute('imagereclamation_index');
        }

        return $this->render('imagereclamation/new.html.twig', [
            'imagereclamation' => $imagereclamation,
            'form' => $form->createView(),
        ]);
    }

    #[Route('/{id}', name: 'imagereclamation_show', methods: ['GET'])]
    public function show(Imagereclamation $imagereclamation): Response
    {
        return $this->render('imagereclamation/show.html.twig', [
            'imagereclamation' => $imagereclamation,
        ]);
    }

    #[Route('/{id}/edit', name: 'imagereclamation_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Imagereclamation $imagereclamation): Response
    {
        $form = $this->createForm(ImagereclamationType::class, $imagereclamation);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('imagereclamation_index');
        }

        return $this->render('imagereclamation/edit.html.twig', [
            'imagereclamation' => $imagereclamation,
            'form' => $form->createView(),
        ]);
    }

    #[Route('/{id}', name: 'imagereclamation_delete', methods: ['DELETE'])]
    public function delete(Request $request, Imagereclamation $imagereclamation): Response
    {
        if ($this->isCsrfTokenValid('delete'.$imagereclamation->getId(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($imagereclamation);
            $entityManager->flush();
        }

        return $this->redirectToRoute('imagereclamation_index');
    }
	
	#[Route('/Setdata/new', name: 'Setdata', methods: ['POST'])]
    public function Setdata(Request $request): Response
    {
		$Imagereclamation = new Imagereclamation();
		$response = new Response();
		$content  = json_decode($request->getContent());
		
 
		$Imagereclamation->setLien($content->Lien);
		$Imagereclamation->setTypeimg($content->TypePhoto);
		$Imagereclamation->setIdreclamation($content->idrecl);
		
		 
		
		$entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($Imagereclamation);
        $entityManager->flush();
		
		$idrec = $Imagereclamation->getId();
		
		 
		
		$response->setContent('{"Status":"ok"}' );
		$response->headers->set('Content-Type', 'application/json');	
		$response->headers->set('Access-Control-Allow-Origin', '*');
		$response->send();
		 
        return new Response(); 
		
		
		

	}
}
